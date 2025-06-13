import { notion } from './notion';

const databaseId = process.env.NOTION_PROJECTS_DB_ID!;

export async function getProjects() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    }
  });

  return response.results.map((page: any) => {
    const props = page.properties;
    return {
      title: props.Name.title[0]?.plain_text || '',
      description: props.Description?.rich_text
        ?.map((t: any) => t.plain_text)
        .join('\n')
        .split('\n')
        .filter((point: string) => point.trim() !== '') || [],
      techStack: props['Tech Stack']?.multi_select.map((t: any) => t.name) || [],
      github: props.GitHub?.url || '',
      demo: props.Demo?.url || ''
    };
  });
}

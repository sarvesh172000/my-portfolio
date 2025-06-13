import { notion } from './notion';

const databaseId = process.env.NOTION_SKILLS_DB_ID!;

export async function getSkills() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  });

  // For each skill, extract the Skill name, Category, and Order
  const skills = response.results.map((page: any) => {
    const props = page.properties;
    
    // Extract the full title by concatenating all text segments
    const skillTitle = props.Skill?.title?.map((segment: any) => segment.plain_text).join('') || '';
    
    return {
      skill: skillTitle,
      category: props.Category?.select?.name || 'Uncategorized',
      order: props.Order?.number || 999, // Default high number for items without order
    };
  });
  return skills;
}

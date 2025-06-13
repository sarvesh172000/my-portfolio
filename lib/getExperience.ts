import { notion } from './notion';
import { parse } from 'date-fns';

function parseDateString(dateString: string) {
  // "Present" → treat as today's date
  if (dateString.trim().toLowerCase() === 'present') {
    return new Date();
  }
  try {
    // "January 2022" format
    return parse(dateString, 'MMMM yyyy', new Date());
  } catch {
    return new Date('1900-01-01');
  }
}

export async function getExperience() {
  const databaseId = process.env.NOTION_EXPERIENCE_DB_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
  });

  const data = response.results.map((page: any) => {
    const props = page.properties;
    const startText = props['Start Date']?.rich_text[0]?.plain_text || '';
    const endText = props['End Date']?.rich_text[0]?.plain_text || '';

    return {
      // If "Company" is Title property:
      company: props.Company?.title[0]?.plain_text || '',
      // If "Role" is Title property instead, swap above line with below:
      // company: props.Company?.rich_text[0]?.plain_text || '',
      role: props.Role?.rich_text[0]?.plain_text || '',
      location: props.Location?.rich_text[0]?.plain_text || '',
      startDateText: startText,
      endDateText: endText,
      startDateObj: parseDateString(startText),
      endDateObj: parseDateString(endText),
      description: props.Description?.rich_text
        ?.map((t: any) => t.plain_text)
        .join('\n') || '',
      logo: props.Logo?.url || '',
    };
  });

  // Sort by start date descending
  data.sort((a, b) => b.startDateObj.getTime() - a.startDateObj.getTime());
  return data;
}

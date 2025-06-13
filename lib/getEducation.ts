import { notion } from './notion';
import { parse } from 'date-fns';

const databaseId = process.env.NOTION_EDUCATION_DB_ID!;

// Helper to parse date strings in "MMMM yyyy" format, handling "Present"
function parseDateString(dateString: string) {
  if (dateString.trim().toLowerCase() === 'present') {
    return new Date(); // treat "Present" as current date for sorting
  }
  try {
    // Expected format: "August 2018", "June 2022", etc.
    return parse(dateString, 'MMMM yyyy', new Date());
  } catch {
    return new Date('1900-01-01'); // fallback for unparseable strings
  }
}

export async function getEducation() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    }
  });

  const data = response.results.map((page: any) => {
    const props = page.properties;
    const startText = props['Start Date']?.rich_text[0]?.plain_text || '';
    const endText = props['End Date']?.rich_text[0]?.plain_text || '';

    return {
      institution: props.Institution?.title[0]?.plain_text || '',
      degree: props.Degree?.rich_text[0]?.plain_text || '',
      location: props.Location?.rich_text[0]?.plain_text || '',
      startDateText: startText,
      endDateText: endText,
      grade: props['CGPA / Grade']?.rich_text[0]?.plain_text || '',
      coursework: props.Coursework?.multi_select?.map((tag: any) => tag.name) || [],
      logo: props.Logo?.url || '',
      // Parse the dates for sorting
      startDateObj: parseDateString(startText),
      endDateObj: parseDateString(endText),
    };
  });

  // Sort by start date descending (most recent first)
  data.sort((a, b) => b.startDateObj.getTime() - a.startDateObj.getTime());

  return data;
}

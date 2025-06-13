import { getEducation } from '@/lib/getEducation';
import EducationList from '@/components/EducationList';

export default async function EducationPage() {
  const educationList = await getEducation();
  return <EducationList educationList={educationList} />;
}

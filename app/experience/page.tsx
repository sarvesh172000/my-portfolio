import { getExperience } from '@/lib/getExperience';
import ExperienceList from '@/components/ExperienceList';

export default async function ExperiencePage() {
  const experienceList = await getExperience();
  return <ExperienceList experienceList={experienceList} />;
}

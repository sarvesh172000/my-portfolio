import { getSkills } from '@/lib/getSkills';
import SkillsList from '@/components/SkillsList';

export default async function SkillsPage() {
  const skills = await getSkills();

  return <SkillsList skills={skills} />;
}

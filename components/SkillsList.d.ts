import { FC } from 'react';

interface Skill {
  name: string;
  description?: string;
  icon?: string;
}

interface SkillsListProps {
  skills: Record<string, Skill[]>;
}

declare const SkillsList: FC<SkillsListProps>;
export default SkillsList; 
import { getProjects } from '@/lib/getProjects';
import ProjectsList from '@/components/ProjectsList';

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsList projects={projects} />;
}

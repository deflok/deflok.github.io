import type { Metadata } from "next";
import { getProjectBySlug, getAllProjects, generateSlug } from '@/utils/api';
import { notFound } from 'next/navigation';
import type { Project } from '@/utils/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project: Project) => ({
    slug: generateSlug(project.title),
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <img src={project.img} alt={project.title} />
    </div>
  );
}
import type { Metadata } from "next";
import { getAllProjects, generateSlug } from '@/utils/api';
import { notFound } from 'next/navigation';
import type { Project } from '@/utils/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}


export default async function ProjectsPage({ params }: PageProps) {
  const projects = await getAllProjects();

  return (
    <div className="content">
      <div className="container">
        <div className="content__inner">

          <main className="main">
            <h1 className="title-lg">Портфолио</h1>


            <div className="works__body">
              {projects.map((project: Project) => (
                <div key={project.id} className="works__item">
                  <a href={`/portfolio/${generateSlug(project.title)}`} className="works__item-full"><span className="fa fa-expand"></span></a>
                  <div className="works__item-image"><img src={project.img} alt="" /></div>
                  <a href="#" className="works__item-title">{project.title}</a>
                </div>
              ))}
            </div>
          </main>


        </div>
      </div>
    </div>
  );
}
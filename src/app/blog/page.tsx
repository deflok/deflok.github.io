import type { Metadata } from "next";
import { getAllProjects, generateSlug } from '@/utils/api';
import { notFound } from 'next/navigation';
import type { Project } from '@/utils/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}


export default async function BlogPage({ params }: PageProps) {

  return (
    <div className="content">
      <div className="container">
        <div className="content__inner">
          <div className="main">
            <h1 className="title-lg">Блог веб-разработчика</h1>

            <div className="blog__list">
              <div className="blog__item"></div>
            </div>
          </div>


          <div className="sidebar">
            <div className="sidebar__row">
              <h3 className="sidebar__title"><span className="fa fa-code"></span>Категории</h3>
              <ul className="sidebar__list">
                <li><a href="#">HTML</a><span>8</span></li>
                <li><a href="#">JavaScript</a><span>120</span></li>
                <li><a href="#">CSS</a><span>2</span></li>
                <li><a href="#">WordPress</a><span>6</span></li>
                <li><a href="#">Шпаргалки</a><span>18</span></li>
                <li><a href="#">Уроки для фрилансеров</a><span>6</span></li>
              </ul>
            </div>


            <div className="sidebar__row">
              <h3 className="sidebar__title"><span className="fa fa-hashtag"></span>Облако тегов</h3>
              <ul className="sidebar__tags">
                <li><a href="#"># <span>css</span></a></li>
                <li><a href="#"># <span>html</span></a></li>
                <li><a href="#"># <span>js</span></a></li>
                <li><a href="#"># <span>уроки</span></a></li>
                <li><a href="#"># <span>php</span></a></li>
                <li><a href="#"># <span>шаблоны</span></a></li>

              </ul>
            </div>



            <div className="sidebar__row">
              <h3 className="sidebar__title"><span className="fa fa-gears"></span>Полезные инстурменты</h3>
              <ul className="sidebar__list">
                <li><a href="#">Надежный хостинг</a></li>
                <li><a href="#">Любые IT услуги</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

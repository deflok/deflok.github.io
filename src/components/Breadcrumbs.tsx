'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <section className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbs__inner">
          <ul className="breadcrumbs__list">
            <li>
              <a href="#"><span className="fa fa-house"></span></a>
            </li>
            <li><a href="#">Блог</a></li>
          </ul>

          <form className="searchform" action="#">
            <input type="text" placeholder="Поиск..." />
            <button>Найти</button>
          </form>
        </div>
      </div>
    </section>
  )
}

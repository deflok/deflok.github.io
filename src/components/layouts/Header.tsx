'use client';

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';


export default function Header() {
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });
  
  return (
    <motion.header className={`header ${scrolled ? '_sticky' : ''}`}>
      <div className="container">
        <div className="header__inner">
          <a href="/" className="header__logo"><span>def...</span><span>it</span></a>

          <nav className="header__menu">
            <ul className="header__menu-list">
              <li><a href="/services/" className="header__menu-link">
                <span className="fa fa-tasks"></span>Услуги
              </a></li>
              <li><a href="/portfolio/" className="header__menu-link">
                <span className="fa fa-suitcase"></span>Портфолио
              </a></li>
              <li><a href="/blog/" className="header__menu-link">
                <span className="fa fa-list"></span>Блог
              </a></li>
            </ul>
          </nav>

          <a href="#" className="header__btn">
            <span className="fa fa-mobile-screen-button"></span>Заказать услугу
          </a>

          <button className="header__burger"><span></span></button>
        </div>
      </div>
    </motion.header>
  )
}

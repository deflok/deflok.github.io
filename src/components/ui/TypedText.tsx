'use client';

import { useEffect, useRef, useState } from 'react';
import { init, type ItypedOptions } from 'ityped';

export default function TypedText() {
  const textElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (textElement.current) {
      const options: ItypedOptions = {
        strings: ['Разработка сайтов', 'качественно', 'недорого', 'Разработка сайтов'],
        typeSpeed: 50,
        backSpeed: 20,
        backDelay: 2000,
        startDelay: 1500,
        loop: false,
        showCursor: true,
        cursorChar: '|'
      };
      
      init(textElement.current, options);
    }
  }, []);

  return <span ref={textElement} style={{display: 'inline-block'}} />;
}
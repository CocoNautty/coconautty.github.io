import { useState, useEffect } from 'react';

const useScrollSpy = (ids, offset = 0) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const viewportHeight = window.innerHeight;
    const topMargin = Math.round(viewportHeight * 0.1);
    const bottomMargin = Math.round(viewportHeight * 0.8);
    const rootMargin = `-${topMargin}px 0px -${bottomMargin}px 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: rootMargin
       }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
};

export default useScrollSpy;
import styles from './Containers.module.scss';
import React, { useEffect, useState, useRef } from 'react';

const SectionContainer = ({ id, children }) => {
    return (
        <section id={id} className={styles.sectioncontainer}>
            {children}
        </section>
    );
}

const TitleContainer = ({ children }) => {
    const [isPinned, setIsPinned] = useState(false);
    const stickyRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const eventHandler = () => {
        if (stickyRef.current) {
            const newWindowWidth = window.innerWidth;
            const computedStyle = window.getComputedStyle(stickyRef.current);
            const { top } = stickyRef.current.getBoundingClientRect();
            if (newWindowWidth === windowWidth) {
                // Check if the sticky element is pinned (top is 0 or below the viewport)
                setIsPinned(top <= 0);
            } else {
                // Check if the sticky element is pinned (top is 0 or below the viewport)
                setIsPinned(top <= 0 && computedStyle.opacity !== '0');
                setWindowWidth(newWindowWidth);
            }
        }
        };

        window.addEventListener('scroll', eventHandler);
        window.addEventListener('resize', eventHandler);

        // Clean up the event listener on component unmount
        return () => {
        window.removeEventListener('scroll', eventHandler);
        window.removeEventListener('resize', eventHandler);
        };
    }, []);

    return (
        <div ref={stickyRef} className={`${styles.titlecontainer} ${!isPinned ? styles.notPinned : styles.Pinned}`}>
            {children}
        </div>
    );
}

const WordBlock = ({ children }) => {
    return (
        <p className={styles.wordblock}>
            {children}
        </p>
    );
}

export { SectionContainer, TitleContainer, WordBlock };
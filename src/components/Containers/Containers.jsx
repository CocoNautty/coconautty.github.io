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

    useEffect(() => {
        const eventHandler = () => {
        if (stickyRef.current) {
            const { top } = stickyRef.current.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(stickyRef.current);
            // Check if the sticky element is pinned (top is 0 or below the viewport)
                setIsPinned(top <= 0 && computedStyle.opacity !== '0');
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
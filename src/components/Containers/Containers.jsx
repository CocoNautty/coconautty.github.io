import styles from './Containers.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash'

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
        const eventHandler = throttle(() => {
        if (stickyRef.current) {
            const windowWidth = window.innerWidth;
            const { top } = stickyRef.current.getBoundingClientRect();
            if (windowWidth <= 768) {
                // Check if the sticky element is pinned (top is 0 or below the viewport)
                setIsPinned(top <= 0);
            }
        }
        }, 100);

        window.addEventListener('scroll', eventHandler);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', eventHandler);
        };
    }, []);

    return (
        <div ref={stickyRef} className={`${styles.titlecontainer} ${isPinned ? styles.Pinned : styles.notPinned}`}>
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
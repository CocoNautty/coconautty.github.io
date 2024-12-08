import styles from './Containers.module.scss';
import React, { useEffect, useState, useRef } from 'react';
import { BiLink } from "react-icons/bi";

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
            const windowWidth = window.innerWidth;
            const { top } = stickyRef.current.getBoundingClientRect();
            if (windowWidth <= 1024) {
                // Check if the sticky element is pinned (top is 0 or below the viewport)
                setIsPinned(top <= 5);
                console.log("isPinned: ", isPinned);
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

const InlineLink = ({ href, children }) => {
    return (
        <a className={styles.inlinelink} href={href} target='_blank' rel='noreferrer noopener'>
            {' '}{children}{' '}
        </a>
    )
}

const CardContainer = ({ children }) => {
    return (
        <div className={styles.cardcontainer}>
            <div className={styles.card} />
            {children}
        </div>
    );
}

const ExperienceTimeSpan = ({ children }) => {
    return (
        <header className={styles.experiencetimespan}>
            {children}
        </header>
    );
}

const ExperienceTitle = ({ href, position, department }) => {
    return (
        <h3 className={styles.cardtitlecontainer}>
            <div>
                <a className={styles.cardtitle} href={href} target='_blank' rel='noreferrer noopener'>
                    <span className={styles.titlecard} />
                    <span>
                        {position}{' - '}
                        <span style={{dislpay: 'inline-block'}}>
                            {department}
                            <BiLink style={{marginLeft: '0.25rem'}} />
                        </span>
                    </span>
                </a>
            </div>
        </h3>
    );
}

const ProjectsImage = ({ src, alt }) => {
    return (
        <img className={styles.projectsimage} src={src} alt={alt} loading='lazy' decoding='async'/>
    );
}

const ProjectsTitle = ({ href, title }) => {
    return (
        <h3 className={styles.cardtitlecontainer}>
            <div>
                <a className={styles.cardtitle} href={href} target='_blank' rel='noreferrer noopener'>
                    <span className={styles.titlecard} />
                    <span>
                        {title}
                        <BiLink style={{marginLeft: '0.25rem'}} />
                    </span>
                </a>
            </div>
        </h3>
    );
}

const CardTags = ({tags}) => {
    return (
        <ul className={styles.cardtagscontainer}>
            {tags.map((tag, index) => (
                <li style={{marginRight: '0.375rem', marginTop: '0.5rem'}} key={index} >
                    <span className={styles.cardtag}>
                        {tag}
                    </span>
                </li>
            ))}
        </ul>
    );
}

const CardList = ({ children }) => {
    return (
        <ol className={styles.cardlist}>
            {children}
        </ol>
    );
}

export { SectionContainer, TitleContainer, WordBlock, InlineLink, CardContainer, ExperienceTimeSpan, ExperienceTitle, CardTags, CardList, ProjectsImage, ProjectsTitle };
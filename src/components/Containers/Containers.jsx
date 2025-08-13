import styles from './Containers.module.scss';
import React from 'react';
import { BiLink } from "react-icons/bi";
import { useStickyState } from '../../hooks/useStickyState';

const SectionContainer = React.memo(({ id, children }) => {
    return (
        <section id={id} className={styles.sectioncontainer}>
            {children}
        </section>
    );
});

const TitleContainer = ({ children }) => {
    const { stickyRef, isPinned } = useStickyState();

    return (
        <div ref={stickyRef} className={`${styles.titlecontainer} ${isPinned ? styles.Pinned : styles.notPinned}`}>
            {children}
        </div>
    );
}

const WordBlock = React.memo(({ children }) => {
    return (
        <p className={styles.wordblock}>
            {children}
        </p>
    );
});

const InlineLink = React.memo(({ href, children }) => {
    return (
        <a className={styles.inlinelink} href={href} target='_blank' rel='noreferrer noopener'>
            {' '}{children}{' '}
        </a>
    )
});

const CardContainer = React.memo(({ children }) => {
    return (
        <div className={styles.cardcontainer}>
            <div className={styles.card} />
            {children}
        </div>
    );
})

const ExperienceTimeSpan = React.memo(({ children }) => {
    return (
        <header className={styles.experiencetimespan}>
            {children}
        </header>
    );
})

const ExperienceTitle = ({ href, position, department }) => {
    return (
        <h3 className={styles.cardtitlecontainer}>
            <div>
                <a className={styles.cardtitle} href={href} target='_blank' rel='noreferrer noopener'>
                    <span className={styles.titlecard} />
                    <span>
                        {position}{' - '}
                        <span style={{display: 'inline-block'}}>
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

const CardTags = React.memo(({tags}) => {
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
})

const CardList = React.memo(({ children }) => {
    return (
        <ol className={styles.cardlist}>
            {children}
        </ol>
    );
})

export { SectionContainer, TitleContainer, WordBlock, InlineLink, CardContainer, ExperienceTimeSpan, ExperienceTitle, CardTags, CardList, ProjectsImage, ProjectsTitle };
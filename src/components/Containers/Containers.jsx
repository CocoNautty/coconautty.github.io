import styles from './Containers.module.scss';

const SectionContainer = ({ id, children }) => {
    return (
        <section id={id} className={styles.sectioncontainer}>
            {children}
        </section>
    );
}

const TitleContainer = ({ children }) => {
    return (
        <div className={styles.titlecontainer}>
            {children}
        </div>
    );
}

export { SectionContainer, TitleContainer };
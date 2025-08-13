import React from 'react';
import styles from './Header.module.scss';
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from 'react-icons/lib';
import { personalInfo } from '../../data/personal';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

const Header = () => {
    const { navigation, socialLinks } = personalInfo;
    const activeSection = useActiveSection(navigation);
    const scrollToSection = useSmoothScroll();

    const NavLink = ({ href, text }) => {

        return (
            <li onClick={() => scrollToSection(text)}>
                <a className={`${styles.jumplinkitem} ${activeSection === text ? styles.active : ''}`}>
                    <span className={styles.navindicator}></span>
                    <span className={styles.navtext}>{text}</span>
                </a>
            </li>
        )
    };

    const SocialLink = ({ title, link, ariaLabel }) => (
        <li className={styles.sociallinkitem} title={title}>
            <a href={link} target='_blank' rel="noopener noreferrer" aria-label={ariaLabel} style={{paddingTop: "10px"}}>
                <span className={styles.sociallinkindicator}>{title}</span>
                <AiFillGithub />
            </a>
        </li>
    );

    return (
        <header className={styles.header}>
            <div>
                <a href="/">
                    <h1 className={styles.title}>
                        {personalInfo.name}
                    </h1>
                </a>
                <h2 className={styles.subtitle}>{personalInfo.title}</h2>
                <p className={styles.shortdescription}>
                    {personalInfo.description}
                </p>
                <nav className={styles.jumplinks} aria-label='In-page jump links'>
                    <ul className={styles.jumplinklist}>
                        {navigation.map((link) => (
                            <NavLink
                                key={link.text}
                                href={link.href}
                                text={link.text}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
            <ul className={styles.sociallinks}>
                <IconContext.Provider value={{ className: styles.sociallinkicon }}>
                    {socialLinks.map(link => (
                        <SocialLink 
                            key={link.title} 
                            title={link.title} 
                            link={link.link} 
                            ariaLabel={link.ariaLabel} 
                        />
                    ))}
                </IconContext.Provider>
            </ul>
        </header>
    )
};

export default Header;
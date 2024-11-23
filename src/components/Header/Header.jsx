import React from 'react';
import styles from './Header.module.scss';
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from 'react-icons/lib';

const Header = () => {
    const navLinks = [
        { href: "#about", text: "About" },
        { href: "#experience", text: "Experiences" },
        { href: "#projects", text: "Projects" },
    ];

    const NavLink = ({ href, text }) => (
        <li>
            <a className={styles.jumplinkitem} href={href}>
                <span className={styles.navindicator}></span>
                <span className={styles.navtext}>{text}</span>
            </a>
        </li>
    );

    const sociallinks = [
        { title: "github", icon: <AiFillGithub/>, link: "https://github.com/CocoNautty"},
    ]

    const SocialLink = ({ title, icon, link }) => (
        <li className={styles.sociallinkitem} title={title}>
            <a href={link}>
                {icon}
            </a>
        </li>
    );

    return (
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>
                    <a href="/">Yixuan Chen</a>
                </h1>
                <h2 className={styles.subtitle}>MSI Student in UMich</h2>
                <p className={styles.shortdescription}>
                    I learn, I code, I build. I put things together and make them work.
                </p>
                <nav className={styles.jumplinks} aria-label='In-page jump links'>
                    <ul className={styles.jumplinklist}>
                        {navLinks.map(link => (
                            <NavLink key={link.href} href={link.href} text={link.text} />
                        ))}
                    </ul>
                </nav>
            </div>
            <ul className={styles.sociallinks}>
                <IconContext.Provider value={{ className: styles.sociallinkicon }}>
                    {sociallinks.map(link => (
                        <SocialLink key={link.title} title={link.title} icon={link.icon} />
                    ))}
                </IconContext.Provider>
            </ul>
        </header>
    )
};

export default Header;
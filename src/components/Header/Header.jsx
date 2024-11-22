import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
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
                        <li>
                            <a className={styles.jumplinkitem} href="#about">
                                <span className={styles.navindicator}></span>
                                <span className={styles.navtext}>About</span>
                            </a>
                        </li>
                        <li>
                            <a className={styles.jumplinkitem} href="#experience">
                                <span className={styles.navindicator}></span>
                                <span className={styles.navtext}>Experience</span>
                            </a>
                        </li>
                        <li>
                            <a className={styles.jumplinkitem} href="#projects">
                                <span className={styles.navindicator}></span>
                                <span className={styles.navtext}>Projects</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export default Header;
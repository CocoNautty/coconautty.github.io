import React from 'react';
import styles from './About.module.scss';
import {SectionContainer, TitleContainer} from '../Containers/Containers';

const About = () => {
    return(
        <SectionContainer id='About'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>About</h2>
            </TitleContainer>
        </SectionContainer>
    );
}

export default About;
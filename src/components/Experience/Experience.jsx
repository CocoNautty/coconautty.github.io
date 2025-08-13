import React from 'react';
import styles from './Experience.module.scss';
import {SectionContainer, TitleContainer, CardContainer, ExperienceTimeSpan, ExperienceTitle, CardTags, CardList} from '../Containers/Containers';
import { experienceData } from '../../data/experience';

const Experience = () => {

    return(
        <SectionContainer id='Experience'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>Experience</h2>
            </TitleContainer>
            <div>
                <CardList>
                    {experienceData.map((experience) => (
                        <li key={experience.id} style={{marginBottom: '3rem'}}>
                            <CardContainer>
                                <ExperienceTimeSpan>
                                    {experience.timespan}
                                </ExperienceTimeSpan>
                                <div className={styles.cardcontent}>
                                    <ExperienceTitle
                                        href={experience.href}
                                        position={experience.position}
                                        department={experience.department}
                                    />
                                    <p className={styles.experiencecontent}>
                                        {experience.description}
                                    </p>
                                    <CardTags tags={experience.tags} />
                                </div>
                            </CardContainer>
                        </li>
                    ))}
                </CardList>
            </div>
        </SectionContainer>
    );
}

export default React.memo(Experience);
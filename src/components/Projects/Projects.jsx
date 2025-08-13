import React from 'react';
import styles from './Projects.module.scss';
import {SectionContainer, TitleContainer, CardContainer, ProjectsImage, ProjectsTitle, CardTags, CardList} from '../Containers/Containers';
import { projectsData } from '../../data/projects';

const Projects = () => {
    return(
        <SectionContainer id='Projects'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>Projects</h2>
            </TitleContainer>
            <div>
                <CardList>
                    {projectsData.map((project) => (
                        <li key={project.id} style={{marginBottom: '3rem'}}>
                            <CardContainer>
                                <ProjectsImage src={project.image.src} alt={project.image.alt} />
                                <div className={styles.cardcontent}>
                                    <ProjectsTitle
                                        href={project.href}
                                        title={project.title}
                                    />
                                    <p className={styles.projectscontent}>
                                        {project.description}
                                    </p>
                                    <CardTags tags={project.tags} />
                                </div>
                            </CardContainer>
                        </li>
                    ))}
                </CardList>
            </div>
        </SectionContainer>
    );
}

export default React.memo(Projects);
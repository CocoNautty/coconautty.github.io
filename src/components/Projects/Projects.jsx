import React from 'react';
import styles from './Projects.module.scss';
import air32_devboard from '../../../public/images/projects/Air32_devboard.jpg';
import custom_zsh_theme from '../../../public/images/projects/custom-zsh-theme.png';
import {SectionContainer, TitleContainer, CardContainer, ProjectsImage, ProjectsTitle, CardTags, CardList} from '../Containers/Containers';

const Projects = () => {
    return(
        <SectionContainer id='Projects'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>Projects</h2>
            </TitleContainer>
            <div>
                <CardList>
                    <li style={{marginBottom: '3rem'}}>
                        <CardContainer>
                            <ProjectsImage src={air32_devboard} alt='Air32 devboard' />
                            <div className={styles.cardcontent}>
                                <ProjectsTitle
                                    href='https://github.com/CocoNautty/Air32_MiniDevBoard'
                                    title='Air32 Chip Super Tiny Dev Board'
                                />
                                <p className={styles.projectscontent}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit.
                                </p>
                                <CardTags tags={['Circuit', 'PCB Design', 'Microcontroller', 'Soldering']} />
                            </div>
                        </CardContainer>
                    </li>

                    <li style={{marginBottom: '3rem'}}>
                        <CardContainer>
                            <ProjectsImage src={custom_zsh_theme} alt='custom zsh theme' />
                            <div className={styles.cardcontent}>
                                <ProjectsTitle
                                    href='https://github.com/CocoNautty/cocofish-magic'
                                    title='Custom ZSH Theme that Fits my Taste'
                                />
                                <p className={styles.projectscontent}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, maxime aliquid praesentium dignissimos eveniet, totam obcaecati aperiam tempora repellat incidunt facere ea. Laborum odio veritatis nam totam facere recusandae fugit.
                                </p>
                                <CardTags tags={['Shell', 'Linux', 'ZSH']} />
                            </div>
                        </CardContainer>
                    </li>

                </CardList>
            </div>
        </SectionContainer>
    );
}

export default Projects;
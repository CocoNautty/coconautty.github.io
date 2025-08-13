import React from 'react';
import styles from './About.module.scss';
import {SectionContainer, TitleContainer, WordBlock} from '../Containers/Containers';
import { aboutContent } from '../../data/about';
import { renderTextWithLinks } from '../../utils/TextRenderer';

const About = () => {
    return(
        <SectionContainer id='About'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>About</h2>
            </TitleContainer>
            <div>
                {aboutContent.map((content) => (
                    <WordBlock key={content.id}>
                        {renderTextWithLinks(content.text, content.links)}
                    </WordBlock>
                ))}
            </div>
        </SectionContainer>
    );
}

export default React.memo(About);
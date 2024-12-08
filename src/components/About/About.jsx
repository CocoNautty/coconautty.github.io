import React from 'react';
import styles from './About.module.scss';
import {SectionContainer, TitleContainer, WordBlock, InlineLink} from '../Containers/Containers';

const About = () => {
    return(
        <SectionContainer id='About'>
            <TitleContainer>
                <h2 className={styles.sectiontitle}>About</h2>
            </TitleContainer>
            <div>
                <WordBlock>
                    As a dedicated student and passionate tech enthusiast, I am constantly exploring
                    new technologies and discovering innovative ways to apply them to real-world
                    challenges. I thrive on hands-on experiences, embracing the learning opportunities
                    that arise from tackling complex problems along the way.
                </WordBlock>

                <WordBlock>
                    Currently, I'm pursuing a Master's degree in big data analytics in
                    <InlineLink href="https://www.si.umich.edu/">
                        University of Michigan School of Information (UMSI)
                    </InlineLink>
                    and my coursework includes subjects such as databases, data mining, and machine learning,
                    along with elective courses that align with my interests, like web development—a course
                    that inspired the creation of this website.
                </WordBlock>

                <WordBlock>
                    While data and web design are key components of my skill set, my expertise extends beyond
                    these areas. I got my Bachelor's degree in Electrical and Computer Engineering from
                    <InlineLink href="https://en.sjtu.edu.cn/">
                        Shanghai Jiao Tong University (SJTU)
                    </InlineLink>
                    where I developed a strong foundation in hardware design and programming. These experiences
                    have greatly helped me on my journey to becoming a "full-stack engineer" (laughs).
                </WordBlock>

                <WordBlock>
                    Currently, I actively engage with various technologies, including operating systems
                    (
                    <InlineLink href="https://get.opensuse.org/tumbleweed/">
                        openSUSE Tumbleweed
                    </InlineLink>
                     is my daily driver), web development, data analytics, machine learning, PCB design,
                    and embedded systems. I also have different proficiencies in multiple programming languages,
                    such as C, C++, Python, JavaScript (React.js), Go, Matlab, Verilog, and assembly.
                </WordBlock>
            </div>
        </SectionContainer>
    );
}

export default About;
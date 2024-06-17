import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './toolbelt.css';
import skills from './skills';

const Toolbelt: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [hoverEffect, setHoverEffect] = useState<number | false>(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleHoverEffect = (index: number) => {
        setHoverEffect(hoverEffect !== index ? index : false);
    };

    const renderSkills = () => {
        let skillWidth = 110;
        let margin = 180;
        let maxSkillsInOneList = Math.floor((windowWidth - margin * 2) / skillWidth);

        const cutoffPoint = 641;

        if (windowWidth < cutoffPoint) {
            skillWidth = 64;
            margin = 64;
            maxSkillsInOneList = Math.floor((windowWidth - margin * 2) / skillWidth);
        }

        const skillsetItems = skills.map((skill, i) => {
            let skillClasses = 'skill';
            if (hoverEffect === i) {
                skillClasses += ' hover';
                return (
                    <li
                        key={i}
                        className={skillClasses}
                        data-name={skill.name}
                        onMouseLeave={() => handleHoverEffect(i)}
                    >
                        <img src={skill.img} alt="skill" />
                    </li>
                );
            } else if (hoverEffect !== false) {
                skillClasses += ' unselected';
            }

            return (
                <li
                    key={i}
                    className={skillClasses}
                    data-name={skill.name}
                    onMouseOver={() => handleHoverEffect(i)}
                >
                    <img src={skill.img} alt="skill" />
                </li>
            );
        });

        let skillLists: JSX.Element[] = [];
        let numberOfLists = Math.round(skillsetItems.length / (maxSkillsInOneList - 0.5));

        while (skillLists.length < numberOfLists) {
            skillLists.push(<></>);
        }

        let currentSkill = 0;
        let numberOfSkillsInLastList = 0;
        let numberOfSkillsInThisList = 0;

        skillLists = skillLists.map((_, i) => {
            numberOfSkillsInThisList = 0;

            let maxNumberOfSkillsInThisList = maxSkillsInOneList;
            if (i % 2 !== 0) {
                maxNumberOfSkillsInThisList--;
            }

            let skillsInList = [];
            while (skillsInList.length <= maxNumberOfSkillsInThisList) {
                skillsInList.push(skillsetItems[currentSkill]);
                if (skillsetItems[currentSkill]) {
                    numberOfSkillsInThisList++;
                }
                currentSkill++;
            }

            skillsInList = _.without(skillsInList, undefined);

            if (
                (numberOfSkillsInLastList % 2 === 0 && numberOfSkillsInThisList % 2 === 0) ||
                (numberOfSkillsInLastList % 2 !== 0 && numberOfSkillsInThisList % 2 !== 0)
            ) {
                if (i === skillLists.length - 1) {
                    return (
                        <ul className="skill-list" key={i} style={{ marginRight: `${skillWidth}px` }}>
                            {skillsInList}
                        </ul>
                    );
                }
            }

            numberOfSkillsInLastList = numberOfSkillsInThisList;
            return <ul className="skill-list" key={i}>{skillsInList}</ul>;
        });

        return skillLists;
    };

    return (
        <section className="toolbelt">
            <h2 className="title">My Toolbelt</h2>
            <h3 className="subtitle">These are some of the tools I use to build websites</h3>
            <div className="skills-container">{renderSkills()}</div>
        </section>
    );
};

export default Toolbelt;
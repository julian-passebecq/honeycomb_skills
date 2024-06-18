import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import './toolbelt.css';
import skills from './skills';

const CategoryToolbelt = ({ categoryIcon }) => {
    const [hoverEffect, setHoverEffect] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState($(window).width());

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth($(window).width());
        };
        $(window).resize(handleResize);
        return () => {
            $(window).off('resize', handleResize);
        };
    }, []);

    const hoverEffectHandler = (i) => {
        setHoverEffect(hoverEffect !== i ? i : false);
    };

    let skillWidth = 110;
    let margin = 180;
    let maxSkillsInOneList = Math.floor((windowWidth - margin * 2) / skillWidth);
    const cutoffpoint = 641;

    if (windowWidth < cutoffpoint) {
        skillWidth = 64;
        margin = 64;
        maxSkillsInOneList = Math.floor((windowWidth - margin * 2) / skillWidth);
    }

    let skillsetItems = skills.map((skill, i) => {
        let skillClasses = 'skill';
        if (hoverEffect === i) {
            skillClasses += ' hover';
            return (
                <li key={i} className={skillClasses} data-name={skill.name} onMouseLeave={() => hoverEffectHandler(i)}>
                    <img src={skill.img} alt="skill" />
                </li>
            );
        } else if (hoverEffect !== false) {
            skillClasses += ' unselected';
        }
        return (
            <li key={i} className={skillClasses} data-name={skill.name} onMouseOver={() => hoverEffectHandler(i)}>
                <img src={skill.img} alt="skill" />
            </li>
        );
    });

    let skillLists = [];
    let numberOfLists = Math.round(skillsetItems.length / (maxSkillsInOneList - 0.5));

    while (skillLists.length < numberOfLists) {
        skillLists.push('list');
    }

    let currentSkill = 0;
    let numberOfSkillsInLastList = 0;
    let numberOfSkillsInThisList = 0;

    skillLists = skillLists.map((skillList, i) => {
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

        if ((numberOfSkillsInLastList % 2 === 0 && numberOfSkillsInThisList % 2 === 0) || (numberOfSkillsInLastList % 2 !== 0 && numberOfSkillsInThisList % 2 !== 0)) {
            if (i === skillLists.length - 1) {
                return <ul className="skill-list" key={i} style={{ marginRight: `${skillWidth}px` }}>{skillsInList}</ul>;
            }
        }

        numberOfSkillsInLastList = numberOfSkillsInThisList;
        return <ul className="skill-list" key={i}>{skillsInList}</ul>;
    });

    return (
        <div className="category-toolbelt">
            <img src={categoryIcon} alt="category" className="category-icon" />
            <div className="skills-container">{skillLists}</div>
        </div>
    );
};

export default CategoryToolbelt;

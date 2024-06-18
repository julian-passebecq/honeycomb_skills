import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import { Element } from 'react-scroll';
import './toolbelt.css';
import skills from './skills';
import biIcon from './bigcategory_images/BI.png';
import mlIcon from './bigcategory_images/ML.png';
import jsIcon from './bigcategory_images/Js.png';
import cloudIcon from './bigcategory_images/Cloud.png';

class Toolbelt extends React.Component {
    constructor(props) {
        super(props);
        this.hoverEffect = this.hoverEffect.bind(this);
        this.cancelHoverEffect = this.hoverEffect.bind(this);
        this.state = { resized: false, hoverEffect: false, windowWidth: $(window).width() };
    }

    componentDidMount() {
        $(window).resize(() => {
            this.setState({ resize: true, windowWidth: $(window).width() });
        });

        const project1 = $('.toolbelt').offset().top;
        const screen_height = $(window).height();
        const activation_offset = 0.5;
        const activation_point1 = project1 - (screen_height * activation_offset);

        $(window).on('scroll', () => {
            const y_scroll_pos = window.pageYOffset;
            const project1_in_view = y_scroll_pos > activation_point1 && y_scroll_pos - screen_height / 1.5 < activation_point1;
            if (project1_in_view) {
                this.props.setPage(6);
            }
        });
    }

    componentWillUnmount() {
        $(window).off('resize');
    }

    hoverEffect(i) {
        this.setState({ hoverEffect: this.state.hoverEffect !== i ? i : false });
    }

    renderSkills() {
        let skillWidth = 110;
        let margin = 180;
        let maxSkillsInOneList = 3; // First row has 3 icons
        const cutoffpoint = 641;

        if (this.state.windowWidth < cutoffpoint) {
            skillWidth = 64;
            margin = 64;
            maxSkillsInOneList = 3; // First row has 3 icons
        }

        let skillsetItems = skills.map((skill, i) => {
            let skillClasses = 'skill';
            if (this.state.hoverEffect === i) {
                skillClasses += ' hover';
                return (
                    <li key={i} className={skillClasses} data-name={skill.name} onMouseLeave={() => this.hoverEffect(i)}>
                        <img src={skill.img} alt="skill" />
                    </li>
                );
            } else if (this.state.hoverEffect !== false) {
                skillClasses += ' unselected';
            }
            return (
                <li key={i} className={skillClasses} data-name={skill.name} onMouseOver={() => this.hoverEffect(i)}>
                    <img src={skill.img} alt="skill" />
                </li>
            );
        });

        let skillLists = [];
        let rowCount = 1;
        let currentSkill = 0;

        while (currentSkill < skillsetItems.length) {
            let numberOfSkillsInThisList = maxSkillsInOneList + (rowCount - 1); // Increase number of icons per row
            let skillsInList = [];

            while (skillsInList.length < numberOfSkillsInThisList && currentSkill < skillsetItems.length) {
                skillsInList.push(skillsetItems[currentSkill]);
                currentSkill++;
            }

            skillLists.push(skillsInList);
            rowCount++;
        }

        return skillLists.map((skillsInList, i) => (
            <ul key={i} className={`skill-list ${i === 0 ? 'first-row' : ''}`}>{skillsInList}</ul>
        ));
    }

    render() {
        return (
            <section className="toolbelt">
                <Element name="toolbelt" />
                <h2 className="title">My Toolbelt</h2>
                <h3 className="subtitle">These are some of the tools I use to build websites</h3>
                <div className="categories-container">
                    <div className="category-toolbelt">
                        <img src={biIcon} alt="BI / Warehouse" className="category-icon" />
                        <div className="skills-container">{this.renderSkills()}</div>
                    </div>
                    <div className="category-toolbelt">
                        <img src={mlIcon} alt="Analytics / ML" className="category-icon" />
                        <div className="skills-container">{this.renderSkills()}</div>
                    </div>
                    <div className="category-toolbelt">
                        <img src={jsIcon} alt="Front / Viz" className="category-icon" />
                        <div className="skills-container">{this.renderSkills()}</div>
                    </div>
                    <div className="category-toolbelt">
                        <img src={cloudIcon} alt="Cloud / ETL" className="category-icon" />
                        <div className="skills-container">{this.renderSkills()}</div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Toolbelt;

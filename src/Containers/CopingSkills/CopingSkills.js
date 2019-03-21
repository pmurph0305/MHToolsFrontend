import { connect } from 'react-redux'
import React from 'react'

import AddSkill from '../../Components/AddSkill/AddSkill'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import SkillCollapsible from '../../Components/SkillCollapsible/SkillCollapsible'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

import {
    addCopingSkill,
    addSharedCopingSkill,
    changeCSViewing,
    getCopingSkills,
    getSharedCopingSkills,
    deleteCopingSkill,
} from './Redux/cs_actions'

const mapStateToProps = state => {
    return {
        user_id: state.appReducer.user_id,
        coping_skills: state.CSReducer.skills.coping_skills,
        error: state.CSReducer.skills.error,
        viewing: state.CSReducer.skills.viewing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCopingSkill: (id, title, desc, shared) => dispatch(addCopingSkill(id,title,desc,shared)),
        onAddSharedCopingSkill: (id, skill_id) => dispatch(addSharedCopingSkill(id, skill_id)),
        onChangeViewing: (viewing) => dispatch(changeCSViewing(viewing)),
        onDeleteCopingSkill: (id, skill_id) => dispatch(deleteCopingSkill(id, skill_id)),
        onGetUserSkills: (id) => dispatch(getCopingSkills(id)),
        onGetSharedSkills: (id, type) => dispatch(getSharedCopingSkills(id,type))
    }
}


const heightTransition = 'max-height 0.3s ease';

class CopingSkills extends React.Component {

    //TODO: share skills.
    //TODO: sort shared skills.
    //TODO: edit skills.


    constructor(props) {
        super(props);
        this.onAddNewSkillClick = this.onAddNewSkillClick.bind(this);
        this.onAddSharedSkillClick = this.onAddSharedSkillClick.bind(this);
        this.onChangeSkillDisplay = this.onChangeSkillDisplay.bind(this);
        this.onDeleteSkillClick = this.onDeleteSkillClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.coping_skills.length) {
            this.props.onGetUserSkills(this.props.user_id);
        }
    }

    onAddSharedSkillClick(skill_id) {
        console.log("Add skill:", skill_id);
        this.props.onAddSharedCopingSkill(this.props.user_id, skill_id);
    }


    onChangeSkillDisplay(event) {
        let expanded = document.getElementsByClassName('collapsibleContent')
        // Add a quick collapse to all currently opened collapsibles.
        for (let i = 0; i < expanded.length; i++) {
            // only do it on collapsibles currently expanded.
            if (expanded[i].style.maxHeight) {
                // use a short time, but still some time so that transitionend fires.
                expanded[i].style.transition = 'max-height 0.001s'
                // set height to null so it collapses.
                expanded[i].style.maxHeight = null; 
                // event listener that only occurs ONCE, to reset transition style.
                expanded[i].addEventListener('transitionend', function() {
                    expanded[i].style.transition = heightTransition;
                }, {once: true})
            }
        }
        if (Number(event.target.value) === 0) {
            // Get User's coping skills
            this.props.onGetUserSkills(this.props.user_id);
            this.props.onChangeViewing('user');
        } else {
            // Get Shared coping skills, default to 'top' for now.
            this.props.onGetSharedSkills(this.props.user_id, 'top')
            this.props.onChangeViewing('shared');
        }
    }

    onShareSkillClick(index) {
        console.log("Share:" + index);
    }

    onAddNewSkillClick() {
        // get title, desc & shared properties of new skill to be added.
        // dispatch action to add to database.
        let title = document.getElementById("add_skill_title");
        let description = document.getElementById("add_skill_description");
        let shared = document.getElementById("add_skill_share").checked;
        if (description.value !== '' && title.value !== '') {
            this.props.onAddCopingSkill(this.props.user_id, title.value, description.value, shared);
            title.value = '';
            description.value = '';
        } else {
            // Display something to alert user that they have to enter both a description and a title to add it to their list.
        }
    }

    onDeleteSkillClick(index, skill_id) {
        let item = document.getElementById('cText_'+index);
        if (item.style.maxHeight) {
            item.style.transition = 'max-height 0s'
            item.style.maxHeight = null;
        }
        this.props.onDeleteCopingSkill(this.props.user_id, skill_id);
    }

    render() {
        const { coping_skills, error, user_id, viewing } = this.props;
        var resizeTimeout;
        
        // Resize expanded collapsibles when window is resized.
        window.onresize = function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                console.log("RESIZE");
                coping_skills.forEach((item, index) => {
                    let text = document.getElementById('cText_'+index);
                    if (text && text.style.maxHeight) {
                        text.style.maxHeight = text.scrollHeight + 'px';
                    }
                })
            }, 100);
        }

        console.log('skills:', coping_skills);
        console.log('error:', error);
        console.log('user:', user_id)
        console.log('viewing:', viewing)
        return( 
            <section className='ma0 pa1 pa3-ns bt black-90 bg-light-gray tc'>
                <h1 className='ma1 mh2'>Coping Skills</h1>
                <p className='ma2 mh4'>
                    A list of coping skills to use in situations to help tolerate stress and conflict.
                </p>
                <SelectionBox
                    className='black ma2 bg-black-10 pa1 hover-bg-black-20 fl db'
                    options={['My coping skills', 'Shared coping skills']}
                    onChange={this.onChangeSkillDisplay}

                />
                { coping_skills && Array.isArray(coping_skills)
                ? coping_skills.map((skill, index) => {
                    return <SkillCollapsible
                        title = {skill['title']}
                        text={skill['description']}
                        index={index}
                        key={index}
                        skill_id={skill['skill_id']}
                        allowAdd={skill['user_id'] === user_id ? false : true}
                        shared={skill['shared']}
                        shareable={skill['shareable']}
                        onAddSharedSkill={this.onAddSharedSkillClick}
                        onShareSkill={this.onShareSkillClick}
                        onDeleteSkill={this.onDeleteSkillClick}
                    />
                })
                : null
                }
                <AddSkill 
                    onAddSkill={this.onAddNewSkillClick}
                />
                {
                    error
                    ? <ErrorBox error={error}/>
                    : null
                }
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CopingSkills);
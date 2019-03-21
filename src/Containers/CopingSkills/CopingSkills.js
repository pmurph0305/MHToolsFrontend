import { connect } from 'react-redux'
import React from 'react'

import AddSkill from '../../Components/AddSkill/AddSkill'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import SkillCollapsible from '../../Components/SkillCollapsible/SkillCollapsible'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

import {
    addCopingSkill,
    getCopingSkills,
    getSharedCopingSkills,
    deleteCopingSkill,
} from './Redux/cs_actions'

const mapStateToProps = state => {
    return {
        user_id: state.appReducer.user_id,
        coping_skills: state.CSReducer.skills.coping_skills,
        error: state.CSReducer.skills.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCopingSkill: (id, title, desc, shared) => dispatch(addCopingSkill(id,title,desc,shared)),
        onDeleteCopingSkill: (id, skill_id) => dispatch(deleteCopingSkill(id, skill_id)),
        onGetUserSkills: (id) => dispatch(getCopingSkills(id)),
        onGetSharedSkills: (id, type) => dispatch(getSharedCopingSkills(id,type))
    }
}


const heightTransition = 'max-height 0.3s ease';

class CopingSkills extends React.Component {

    //TODO: delete skills.
    //TODO: add skills.
    //TODO: share skills.
    //TODO: sort shared skills.
    //TODO: edit skills.


    constructor(props) {
        super(props);
        // this.state=initialState;
        this.onChangeSkillDisplay = this.onChangeSkillDisplay.bind(this);
        this.onAddNewSkillClick = this.onAddNewSkillClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.coping_skills) {
            this.props.onGetUserSkills(this.props.user_id);
        }
    }

    onAddSkillClick(coping_id) {
        // console.log("Add skill:", coping_id);
        // let skill = displayedSkills.filter(skill => skill['coping_id'] === coping_id);
        // console.log("Found skill:", skill)
        // Use action to send fetch to server to add to coping skills list.
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
        } else {
            // Get Shared coping skills, default to 'top' for now.
            this.props.onGetSharedSkills(this.props.user_id, 'top')
        }
    }

    onShareSkillClick(index) {
        console.log("Share:" + index);
    }

    onAddNewSkillClick() {
        // get title, desc & shared properties of new skill to be added.
        // dispatch action to add to database.
        //this.props.onAddCopingSkill();
        let title = document.getElementById("add_skill_title").value;
        let description = document.getElementById("add_skill_description").value;
        let shared = document.getElementById("add_skill_share").checked;

        if (description !== '' && title !== '') {
            this.props.onAddCopingSkill(this.props.user_id, title, description, shared);
        } else {
            console.log('er')
        }
    }

    render() {
        const { coping_skills, error, user_id } = this.props;
        var resizeTimeout;

        // Resize expanded collapsibles when window is resized.
        window.onresize = function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
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
        console.log('user', user_id)

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
                        onAddSkill={this.onAddSkillClick}
                        onShareSkill={this.onShareSkillClick}
                        onDeleteSkill={(skill_id) => this.props.onDeleteCopingSkill(user_id, skill_id)}
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
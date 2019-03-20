import { connect } from 'react-redux'
import React from 'react'

import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import Collapsible from '../../Components/Collapsible/Collapsible'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

import {
    getCopingSkills,
    getSharedCopingSkills
} from './Redux/cs_actions'
import { createInflate } from 'zlib';

const mapStateToProps = state => {
    return {
        user_id: state.appReducer.user_id,
        coping_skills: state.CSReducer.skills.coping_skills,
        error: state.CSReducer.skills.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserSkills: (id) => dispatch(getCopingSkills(id)),
        onGetSharedSkills: (id, type) => dispatch(getSharedCopingSkills(id,type))
    }
}


const heightTransition = 'max-height 0.3s ease';

class CopingSkills extends React.Component {

    constructor(props) {
        super(props);
        // this.state=initialState;
        this.onChangeSkillDisplay = this.onChangeSkillDisplay.bind(this);
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
            console.log("change to my skills")
            this.props.onGetUserSkills(this.props.user_id);
        } else {
            console.log("change to shared")
            this.props.onGetSharedSkills(this.props.user_id, 'top')
          //  this.setState({displayedSkills: sharedSkills})
            // display shared coping skills
        }
        
        //this.setState({displayedSkills: displayedSkills})
    }

    
    // move into collapsible.js?
    onCollapisbleClick(index) {
        console.log("click: " + index);
        // Get element for the skill clicked on.
        let text = document.getElementById('cText_'+index);
        let title = document.getElementById('cTitle_'+index);
        console.log('title', title);
        // Set max height to add transition to expanding card.
        // Move border from bottom of description button to
        // bottom of the text to seperate it better from next coping skill.
        if (text.style.maxHeight) {
            title.style.borderBottom = '1px solid black'
            text.style.display = 'none';
            text.style.maxHeight = null;
        } else {
            title.style.borderBottom = '0px';
            text.style.display = 'block';
            text.style.maxHeight = text.scrollHeight + 'px';
        }
    }

    onShareSkillClick(index) {
        console.log("Share:" + index);
    }

    render() {
        const { coping_skills, error, user_id } = this.props;
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
                    className='black ma2 pa1 hover-bg-black-20 fl'
                    options={['My coping skills', 'Shared coping skills']}
                    onChange={this.onChangeSkillDisplay}

                />
                { coping_skills && Array.isArray(coping_skills)
                ? coping_skills.map((skill, index) => {
                    return <Collapsible
                        title = {skill['title']}
                        text={skill['description']}
                        index={index}
                        key={index}
                        skill_id={skill['skill_id']}
                        allowAdd={skill['user_id'] === user_id ? false : true}
                        shared={skill['shared']}
                        shareable={skill['shareable']}
                        onExpand={this.onCollapisbleClick}
                        onAddSkill={this.onAddSkillClick}
                        onShareSkill={this.onShareSkillClick}
                    />
                })
                : error
                ? <ErrorBox error={error}/>
                : null
                }
                
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CopingSkills);
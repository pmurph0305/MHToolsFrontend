import { connect } from 'react-redux'
import React from 'react'

import AddSkill from '../../Components/AddSkill/AddSkill'
import ErrorBox from '../../Components/ErrorBox/ErrorBox'
import SkillCollapsible from '../../Components/SkillCollapsible/SkillCollapsible'
import SelectionBox from '../../Components/SelectionBox/SelectionBox'

import {
    addCopingSkill,
    addSharedCopingSkill,
    changeCSEditing,
    changeCSSharedOrder,
    changeCSViewing,
    getCopingSkills,
    getSharedCopingSkills,
    deleteCopingSkill,
    putShareCopingSkill,
    updateUserCopingSkill,
} from './Redux/cs_actions'

const mapStateToProps = state => {
    return {
        user_id: state.appReducer.user_id,
        coping_skills: state.CSReducer.skills.coping_skills,
        error: state.CSReducer.skills.error,
        shared_order: state.CSReducer.skills.shared_order,
        viewing: state.CSReducer.skills.viewing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCopingSkill: (id, title, desc, shared) => dispatch(addCopingSkill(id,title,desc,shared)),
        onAddSharedCopingSkill: (id, skill_id) => dispatch(addSharedCopingSkill(id, skill_id)),
        onChangeCSEditing: (index) => dispatch(changeCSEditing(index)),
        onChangeCSSharedOrder: (order) => dispatch(changeCSSharedOrder(order)),
        onChangeViewing: (viewing) => dispatch(changeCSViewing(viewing)),
        onDeleteCopingSkill: (id, skill_id) => dispatch(deleteCopingSkill(id, skill_id)),
        onGetUserSkills: (id) => dispatch(getCopingSkills(id)),
        onGetSharedSkills: (id, type) => dispatch(getSharedCopingSkills(id,type)),
        onShareUserCopingSkill: (id, skill_id) => dispatch(putShareCopingSkill(id, skill_id)),
        onUpdateUserCopingSkill: (id, skill_id, title, desc) => dispatch(updateUserCopingSkill(id, skill_id, title, desc))
    }
}


const heightTransition = 'max-height 0.3s ease';

class CopingSkills extends React.Component {

    //TODO: Change buttons to icons.
    //TODO: Edit coping skill title.
    //TODO: Fix edit description textarea jiggling.

    constructor(props) {
        super(props);
        this.onAddNewSkillClick = this.onAddNewSkillClick.bind(this);
        this.onAddSharedSkillClick = this.onAddSharedSkillClick.bind(this);
        this.onChangeSkillDisplay = this.onChangeSkillDisplay.bind(this);
        this.onChangeSharedViewType = this.onChangeSharedViewType.bind(this);   
        this.onDeleteSkillClick = this.onDeleteSkillClick.bind(this);
        this.onEditSkillClick = this.onEditSkillClick.bind(this);
        this.onRefreshSharedClick = this.onRefreshSharedClick.bind(this);
        this.onShareSkillClick = this.onShareSkillClick.bind(this);
        
        this.getSharedSkills = this.getSharedSkills.bind(this);
        this.modifyExpandedCollapsibleSize = this.modifyExpandedCollapsibleSize.bind(this);
    }

    componentDidMount() {
        if (!this.props.coping_skills.length) {
            this.props.onGetUserSkills(this.props.user_id);
        }
        if (this.props.viewing === 'shared') {
            document.getElementById("cs_viewing_box").selectedIndex = "1"
            document.getElementById('cs_shared_order').selectedIndex = this.props.shared_order.toString();
        } else {
            document.getElementById("cs_viewing_box").selectedIndex = "0"
        }
    }

    onAddSharedSkillClick(skill_id) {
        this.props.onAddSharedCopingSkill(this.props.user_id, skill_id);
    }



    onChangeSkillDisplay(event) {
        let expanded = document.getElementsByClassName('collapsibleContent')
        // Add a quick collapse to all currently opened collapsibles.
        for (let i = 0; i < expanded.length; i++) {
            // only do it on collapsibles currently expanded.
            if (expanded[i].style.maxHeight) {
                console.log("expanded", i)
                // use a short time, but still some time so that transitionend fires.
                expanded[i].style.transition = 'max-height 0.001s'
                // set height to null so it collapses.
                expanded[i].style.maxHeight = null; 
                // event listener that only occurs ONCE, to reset transition style.
                expanded[i].addEventListener('transitionend', function() {
                    expanded[i].style.transition = heightTransition;
                    document.getElementById('cDescContainer_'+i).style.borderBottom = '0px';
                    document.getElementById('cTitle_'+i).style.borderBottom = '1px solid black';
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

    onChangeSharedViewType(event) {
        this.getSharedSkills(event.target.value);
    }

    onRefreshSharedClick() {
        let order = document.getElementById('cs_shared_order').value;
        this.getSharedSkills(order);
    }

    getSharedSkills(order) {
        switch(parseInt(order)) {
            case(0):
                this.props.onGetSharedSkills(this.props.user_id, 'top');
                this.props.onChangeCSSharedOrder(0);
                return;
            case(1):
                this.props.onGetSharedSkills(this.props.user_id, 'new');
                this.props.onChangeCSSharedOrder(1);
                return;
            case(2):
                this.props.onGetSharedSkills(this.props.user_id, 'rand');
                this.props.onChangeCSSharedOrder(2);
                return;
            default:
                return;
        }
    }

    onShareSkillClick(skill_id) {
        this.props.onShareUserCopingSkill(this.props.user_id, skill_id);
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
        let item = document.getElementById('cDescContainer_'+index);
        if (item.style.maxHeight) {
            item.style.transition = 'max-height 0s'
            item.style.maxHeight = null;
            item.style.borderBottom = '0px';
        }
        this.props.onDeleteCopingSkill(this.props.user_id, skill_id);
    }

    componentDidUpdate() {
        if (this.props.viewing === 'user') {
            this.modifyExpandedCollapsibleSize();
        }
    }

    modifyExpandedCollapsibleSize() {
        this.props.coping_skills.forEach((skill, index) => {
            if (skill.hasOwnProperty('editing')) {
                let text = document.getElementById('cDescContainer_'+index);
                if (text && text.style.maxHeight) {
                    let desc = document.getElementById('cDescArea_'+index);
                    if (desc) {
                        desc.style.height = desc.scrollHeight + 'px';
                    }
                    text.style.maxHeight = text.scrollHeight + 'px';
                }
            }
        })
    }

    onEditSkillClick(index) {
        if (this.props.coping_skills[index].editing) {
            let title = document.getElementById('cTitle_'+index).value;
            //console.log('tv',title.value);
            let desc = document.getElementById('cDescArea_'+index).value;
            if (title !== this.props.coping_skills[index]['title'] || desc !== this.props.coping_skills[index]['description']) {
               this.props.onUpdateUserCopingSkill(this.props.user_id, this.props.coping_skills[index]['skill_id'], title, desc);
            }
        } 
       this.props.onChangeCSEditing(index);
    }

    render() {
        const { coping_skills, error, user_id, viewing } = this.props;
        var resizeTimeout;
        
        // Resize expanded collapsibles when window is resized.
        window.onresize = function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                coping_skills.forEach((item, index) => {
                    let text = document.getElementById('cDescContainer_'+index);
                    if (text && text.style.maxHeight) {
                        text.style.maxHeight = text.scrollHeight + 'px';
                    }
                })
            }, 100);
        }
        return( 
            <section className='ma0 pa1 pa3-ns bt black-90 bg-light-gray tc'>
                <h1 className='ma1 mh2'>Coping Skills</h1>
                <p className='ma2 mh4'>
                    A list of coping skills to use in situations to help tolerate stress and conflict.
                </p>
                <SelectionBox
                    id='cs_viewing_box'
                    className='black ma2 bg-black-10 pa1 hover-bg-black-20 fl db'
                    options={['My coping skills', 'Shared coping skills']}
                    onChange={this.onChangeSkillDisplay}

                />
                { viewing === 'shared' // if viewing shared, display view by selection box.
                ? <><SelectionBox
                    id='cs_shared_order'
                    className='black ma2 bg-black-10 pa1 hover-bg-black-20 fl db'
                    options={['Top', 'Newest', 'Random']}
                    onChange={this.onChangeSharedViewType}

                />
                <button 
                    className='black ma2 bg-black-10 pa1 hover-bg-black-20 fl db'
                    onClick={this.onRefreshSharedClick}
                >Refresh</button>
                
                </>
                : null
                }
                { coping_skills && Array.isArray(coping_skills)
                ? coping_skills.map((skill, index) => {
                    return <SkillCollapsible
                        allowAdd={skill['user_id'] === user_id ? false : true}
                        editing={skill['editing']}
                        index={index}
                        key={index}
                        shareable={skill['shareable']}
                        shared={skill['shared']}
                        skill_id={skill['skill_id']}
                        text={skill['description']}
                        title={skill['title']}
                        onAddSharedSkill={this.onAddSharedSkillClick}
                        onEditSkill={this.onEditSkillClick}
                        onShareSkill={this.onShareSkillClick}
                        onDeleteSkill={this.onDeleteSkillClick}
                    />
                })
                : null
                }
                { viewing === 'user'
                ?
                <AddSkill 
                    onAddSkill={this.onAddNewSkillClick}
                />
                :
                null
                }
               
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
import React from 'react';

export const AddSkill = ({onAddSkill, addError}) => {

    return(
        <div className="pv4">
            <label htmlFor="add_skill_title" className="f6 tl b db mb2">Add new coping skill:</label>
            <input 
                placeholder="Coping Skill Title"
                id="add_skill_title" 
                type="text" 
                aria-describedby="New Task"
                className="f6 f5-l input-reset fl black-80 bg-white pa2 lh-solid w-100 br2-ns br--left-ns"
            />


            <textarea
                rows="4"
                placeholder="Coping Skill Description"
                id="add_skill_description" 
                type="text" 
                aria-describedby="New Task"
                className="f6 f5-l input-reset fl black-80 bg-white mv2 pa2 lh-solid w-100 br2-ns br--left-ns"
            ></textarea>
            <div className='fl' >
                Share skill: <input type="checkbox" id="add_skill_share"/>
            </div>
            { addError
            ? <p>{addError}</p>
            : null
            }
            <button
                    type='button'
                    className="f6 f5-l babutton-reset fr pv2 tc db bn bg-animate bg-dark-green hover-bg-black-70 white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                    onClick={onAddSkill}
                >Add new skill.
            </button>
            
        </div>
    )
}

export default AddSkill;
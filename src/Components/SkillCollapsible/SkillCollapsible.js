import React from 'react'

import './SkillCollapsible.css'

const Collapsible = ({allowAdd, skill_id, index, shared, shareable, text, title, onAddSkill, onShareSkill}) => {

    function onCollapisbleClick(title, index) {
        // Get text content element for the skill clicked on.
        let text = document.getElementById('cText_'+index);     
        if (text.style.maxHeight) {
            // Add border back to the title.
            title.style.borderBottom = '1px solid black'
            text.style.display = 'none';
            text.style.maxHeight = null;
        } else {
            // Remove border from the title.
            title.style.borderBottom = '0px';
            text.style.display = 'block';
            // Set max height to add transition to expanding card.
            text.style.maxHeight = text.scrollHeight + 'px';
        }
    }

    return(
        <div>
            <button className='collapsible'
                id={'cTitle_'+index}
                onClick={(event) => onCollapisbleClick(event.target, index)}
            >{title}
            </button>    
            <div 
                id={'cText_'+index}
                className='collapsibleContent'
            >
                <p className='collapsibleText'>
                    {text}
                </p>
                { allowAdd // Addable to users own list, viewing shared skills.
                ? <button
                    className='collapsibleInnerButton'
                    onClick={() => onAddSkill(skill_id)}
                >
                    Add to my coping skills
                </button>
                : shareable && !shared // Is a user's created skill, and able to be shared.
                ? <button
                    className='collapsibleInnerButton'
                    onClick={() => onShareSkill(skill_id)}
                >
                    Share
                </button>
                : null
                }
            </div>
        </div>
    )
}

export default Collapsible
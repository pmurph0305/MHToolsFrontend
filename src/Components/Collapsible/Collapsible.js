import React from 'react'

import './Collapsible.css'

const Collapsible = ({allowAdd, skill_id, index, shared, shareable, text, title, onAddSkill, onExpand, onShareSkill}) => {
    return(
        <div>
            <button className='collapsible'
                id={'cDesc_'+index}
                onClick={() => onExpand(index)}
                >{title}{}</button>
            <div 
                id={'cText_'+index}
                className='collapsibleContent'
                >{text}<br/>
                { allowAdd
                ? <button
                    className='collapsibleInnerButton'
                    onClick={() => onAddSkill(skill_id)}
                    >
                    Add to my coping skills
                </button>
                : shareable && !shared
                ? <button
                    className='collapsibleInnerButton'
                    onClick={() => onShareSkill(skill_id)}
                    >
                    Share
                </button>
                : null
                }
            </div>
            
            {/* {text} */}
        </div>
    )
}

export default Collapsible
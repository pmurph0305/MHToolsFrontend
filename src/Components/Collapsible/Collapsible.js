import React from 'react'

import './Collapsible.css'

const Collapsible = ({coping_id, description, index, text, onAddSkill, onExpand}) => {
    return(
        <div>
            <button className='collapsible'
                id={'cDesc_'+index}
                onClick={() => onExpand(index)}
                >{description}</button>
            <div 
                id={'cText_'+index}
                className='collapsibleContent'
                >{text}<br/>
                <button
                    className='addToMyListButton'
                    onClick={() => onAddSkill(coping_id)}
                    >
                    Add to my coping skills
                </button>
            </div>
            
            {/* {text} */}
        </div>
    )
}

export default Collapsible
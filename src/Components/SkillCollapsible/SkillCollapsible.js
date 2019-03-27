import React from 'react'

import './SkillCollapsible.css'


const Collapsible = ({allowAdd, editing, index, shared, shareable, skill_id, text, title, onAddSharedSkill, onDeleteSkill, onEditSkill, onShareSkill}) => {

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
                value={title}
                onClick={(event) => onCollapisbleClick(event.target, index)}
            >{title}
            </button>    
            <div 
                id={'cText_'+index}
                className='collapsibleContent'
            >
            { editing 
            ? <textarea
                id={'cDesc_'+index}
                defaultValue={text}
                rows="4"
                placeholder="Coping Skill Description"
                
                type="text" 
                aria-describedby="New Task"
                className="f6 f5-l input-reset fl black-80 bg-white mv2 pa2 lh-solid w-80 br2-ns br--left-ns"
            ></textarea>
            : 
                <p className='collapsibleText' id={'cDesc_'+index}>
                    {text}
                </p>
            }
                { shareable && !shared // Is a user's created skill, and able to be shared.
                ? <button
                    className='collapsibleInnerButton'
                    onClick={() => onShareSkill(skill_id)}
                >Share
                </button>
                : null
                }
                { !allowAdd && !editing// Not viewing shared skills, allow editing and deletion.
                ? 
                <>  <button
                        className='collapsibleDeleteButton'
                        onClick={() => onDeleteSkill(index, skill_id)}
                    >Delete
                    </button>
                    <button
                        className='collapsibleDeleteButton'
                        onClick={() => onEditSkill(index)}
                    >Edit
                    </button>
                </>
                : editing
                ? <button
                        className='collapsibleInnerButton'
                        onClick={() => onEditSkill(index)}
                    >Save
                    </button>
                : <button // viewing shared skills, can only add skill.
                    className='collapsibleInnerButton'
                    onClick={() => onAddSharedSkill(skill_id)}
                >Add to my coping skills
                </button>
                }
            </div>
        </div>
    )
}

export default Collapsible
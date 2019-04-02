import React from 'react'

import './SkillCollapsible.css'

const Collapsible = ({allowAdd, editing, index, shared, shareable, skill_id, text, title, onAddSharedSkill, onDeleteSkill, onEditSkill, onShareSkill}) => {

    function onCollapisbleClick(title, index) {
        // Get text content element for the skill clicked on.
        console.log("collapsibleClick");
        let text = document.getElementById('cDescContainer_'+index);     
        if (text.style.maxHeight !== '0px' && text.style.maxHeight) {
            // Add border back to the title.
       //     title.style.borderBottom = '1px solid black'
            text.style.borderBottom = '0px'
            text.style.display = 'none';
            text.style.maxHeight = '0px';
        } else {
            // Remove border from the title.
          //  title.style.borderBottom = '0px';
            text.style.borderBottom = '1px solid black'
            text.style.display = 'block';
            // Set max height to add transition to expanding card.
            text.style.maxHeight = text.scrollHeight + 'px';
        }
    }

    function onDescriptionChange(area) {
        if (area) {
            let container = document.getElementById('cDescContainer_'+index);
            // set new container maxHeight to be large enough so there's no jiggle when redoing area height.
            container.style.maxHeight = area.scrollHeight*2 + 'px'; 
            area.style.height = 0;
            area.style.height = Math.max(16, area.scrollHeight) + 'px';
        }
    }

    return(
        <div>
            {editing
            ? <input id={'cTitle_'+index} className='collapsibleTitleInput' type='text' defaultValue={title}></input>
            :
            <button className='collapsible'
                id={'cTitle_'+index}
                value={title}
                onClick={(event) => onCollapisbleClick(event.target, index)}
            >{title}
            </button>     
            }
            <div 
                id={'cDescContainer_'+index}
                className='collapsibleContent'
            >
                { editing 
                ? 
                <textarea
                    
                    id={'cDescArea_'+index}
                    defaultValue={text}
                    placeholder="Coping Skill Description"
                    type="text" 
                    aria-describedby="New Task"
                    className="collapsibleTextArea"
                    rows="0"
                    onChange={(event)=> onDescriptionChange(event.target)}
                ></textarea>
                : 
                <p className='collapsibleText' id={'cDesc_'+index}>
                    {text}
                </p>
                }
                { shareable && !shared // Is a user's created skill, and able to be shared.
                ? 
                <button
                    className='collapsibleInnerButton'
                    onClick={() => onShareSkill(skill_id)}
                >Share
                </button>
                : null
                }
                { !allowAdd && !editing// Not viewing shared skills, allow editing and deletion.
                ? 
                <>  
                    <button
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
                ? 
                <button
                    className='collapsibleInnerButton'
                    onClick={() => onEditSkill(index)}
                >Save
                </button>
                : 
                <button // viewing shared skills, can only add skill.
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
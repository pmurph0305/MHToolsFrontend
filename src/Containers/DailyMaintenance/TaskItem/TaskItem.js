import React from 'react';
import './TaskItem.css'

const TaskItem = ({task, id, onCheck, onRemove, onChange, checked, editing}) => {
    return (
        <label htmlFor={id} className='taskContainer'>
            {!editing ? 
                <div>
                    <div className='taskText'>{task}</div>
                    <input type='checkbox'
                        className='hiddenCheckbox'
                        onClick={onCheck}
                        id={id}
                        defaultChecked={checked}
                    />
                    <span className='checkmark'
                    ></span>
                </div>
            :
                <div>
                    <div className='taskText'>
                        <input
                            id={"task_"+id}
                            //className="f4 input-reset fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                            className="f3 input-reset border-box hover-black mw-80 w-80 ba b--black-40 pa1 ma1" 
                            value={task}
                            onChange={(event) => onChange(event, id)}
                        />
                        
                        <button
                            className="f5 button-reset pv2 ma1 v-top  tc bg-animate bg-light-red hover-bg-red white pointer w-10"
                            onClick={() => onRemove(id)}
                            type="button">
                            Remove
                        </button>
                        
                        
                    </div>
                </div>
            }
       
        </label>

    )
};

export default TaskItem;
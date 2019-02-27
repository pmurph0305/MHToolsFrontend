import React from 'react';
import './TaskItem.css'

const TaskItem = ({task, id, onCheck, onRemove, onChange, onRankChange, checked, editing}) => {
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
                    <div className='flex'>
                        <div className='orderContainer'>
                            <button 
                                className='rankButton'
                                onClick={() => onRankChange(id, -1)}
                            >/\</button>
                            <button 
                                className='rankButton'
                                onClick={() => onRankChange(id, 1)}
                            >\/</button>
                        </div>
                        <input
                            id={"task_"+id}
                            //className="f4 input-reset fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                            className="f3 input-reset border-box hover-black ba b--black-40 pa1 ma1 w-100" 
                            value={task}
                            onChange={(event) => onChange(event, id)}
                        />
                        
                        <button
                            // Change remove button to non-text remove button.
                            className="f5 fr button-reset ph3 ma1 v-mid tc bg-light-red hover-bg-red white pointer"
                            onClick={() => onRemove(id)}
                            type="button">
                            X
                        </button>
                        
                        
                    </div>
                </div>
            }
       
        </label>

    )
};

export default TaskItem;
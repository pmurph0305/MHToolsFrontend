import React from 'react';
import './TaskItem.css'

const TaskItem = ({task, id, onCheck, checked}) => {
    return (
        <label htmlFor={id} className='taskContainer'>
            <div className='taskText'>{task}</div>
            <input type='checkbox'
                className='hiddenCheckbox'
                onClick={onCheck}
                id={id}
                defaultChecked={checked}
            />
            <span className='checkmark'
            ></span>
            
        </label>

    )
};

export default TaskItem;
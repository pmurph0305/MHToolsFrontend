import React from 'react';
import './TaskItem.css'

const TaskItem = ({task, id, checkbox, onCheck}) => {
    return (
        <label htmlFor={id} className='taskContainer'>
            <div className='taskText'>{task}</div>
            <input type='checkbox'
                className='hiddenCheckbox'
                onClick={onCheck}
                id={id}
            />
            <span className='checkmark'
            ></span>
            
        </label>

    )
};

export default TaskItem;
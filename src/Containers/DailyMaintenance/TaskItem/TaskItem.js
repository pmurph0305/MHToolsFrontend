import React from 'react';

const TaskItem = ({task, id, checkbox, onCheck}) => {
    return (
        <div className="pa3 tl bb">
            <input 
            className="mr3"
            id={id}
            type="checkbox"
            onClick={onCheck}
            />{task}
        </div>
    )
};

export default TaskItem;
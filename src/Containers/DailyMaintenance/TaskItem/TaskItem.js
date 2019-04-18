import React from 'react';
import ClickableIcon from '../../../Components/ClickableIcon/ClickableIcon'
import './TaskItem.scss'

const TaskItem = ({task, id, onCheck, onRemove, onChange, onRankChange, onEditClick, checked, editing, allowEditing}) => {
    
    return (
        <div className='taskContainer'>
            <div>
                <ul className='arrowContainer'>
                        <li><ClickableIcon iconName="arrow-up" iconSize="small" onClick={() => onRankChange(id, -1)}/></li>
                        <li><ClickableIcon iconName="arrow-down" iconSize="small"  onClick={() => onRankChange(id, 1)}/></li>
                    </ul>
          

                {allowEditing 
                ?   <div className='iconContainer'>
                        <ClickableIcon iconName="close" onClick={() => onRemove(id)}/>
                        {editing
                        ?   <ClickableIcon iconName="save" onClick={() => onEditClick(id)}/>
                        :   <ClickableIcon iconName="create" onClick={() => onEditClick(id)}/>
                        }
                    </div>  
                : null}
            
                <label htmlFor={id}>
          
                    { editing
                    ?   <input
                            id={"task_"+id}
                            //className="f4 input-reset fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                            className="taskInput" 
                            value={task}
                            label={'Edit task ' + id + ' text field'}
                            aria-label={'Edit task ' + id + ' text field'}
                            onChange={(event) => onChange(id, event.target.value)}
                        />
                    :   <div className='taskText'>
                            {task}
                        </div>
                    }
              
                    <input type='checkbox'
                        className='hiddenCheckbox'
                        id={id}
                        onClick={onCheck}
                        defaultChecked={checked}
                    />
                    <span className='checkmark'/>
                </label>
            </div>
        </div>

    )
};

export default TaskItem;


{/* <div>
                    <div className='flex'>
                        <div className='orderContainer'>
                            <button 
                                className='rankButton'
                                label={"move task " + id + " up on list"}
                                aria-label={"move task " + id + " up on list"}
                                onClick={() => onRankChange(id, -1)}
                            >/\</button>
                            <button 
                                className='rankButton'
                                label={"move task " + id + " down on list"}
                                aria-label={"move task " + id + " down on list"}
                                onClick={() => onRankChange(id, 1)}
                            >\/</button>
                        </div>
                        <input
                            id={"task_"+id}
                            //className="f4 input-reset fl black-80 bg-white pa2 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                            className="f3 input-reset border-box hover-black ba b--black-40 pa1 ma1 w-100" 
                            value={task}
                            label={'Edit task ' + id + ' text field'}
                            aria-label={'Edit task ' + id + ' text field'}
                            onChange={(event) => onChange(id, event.target.value)}
                        />
                        
                        <button
                            // Change remove button to non-text remove button.
                            className="f5 fr button-reset ph3 ma1 v-mid tc bg-light-red hover-bg-red white pointer"
                            label={"remove task " + id}
                            aria-label={"remove task " + id}
                            onClick={() => onRemove(id)}
                            type="button">
                            X
                        </button>
                        
                        
                    </div>
                </div> */}
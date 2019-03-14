import { connect } from 'react-redux'
import InputField from '../../Components/InputField/InputField'
import DMDateNav from '../../Components/DMDateNav/DMDateNav'
import React from 'react'
import TaskItem from './TaskItem/TaskItem'


import { setDMEditing, requestDMTasks, onDMSaveClick, swapDMTaskRanks,
     addDMTask, toggleDMTask, changeDMTaskName,
     removeDMTask
    
    } from '../../actions'

const inputPlaceholder = "Enter a task to add..."

const mapStateToProps = state => {
    return {
        editing: state.setDMEditing.dm_editing,
        taskList: state.dmTasksReducer.dm_taskList,
        taskListError: state.dmTasksReducer.dm_error,
        taskListIsPending: state.dmTasksReducer.dm_isPending,
        date: state.dmTasksReducer.dm_date
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditToggle: (bool) => dispatch(setDMEditing(bool)),
        onSaveClick: (id, updatedTasks) => dispatch(onDMSaveClick(id, updatedTasks)),
        onSwapTaskRanks: (index1, index2) => dispatch(swapDMTaskRanks(index1, index2)),
        onRequestDMTaskList: (id, date, change) => dispatch(requestDMTasks(id, date, change)),//requestDMTasks(dispatch)
        onAddDMTask: (id, task, rank) => dispatch(addDMTask(id, task, rank)),
        onToggleDMTask: (id, task_id, index, checked) => dispatch(toggleDMTask(id, task_id, index, checked)), 
        onTaskTextChange: (id, text) => dispatch(changeDMTaskName(id, text)),
        onRemoveTask: (id, task_id) => dispatch(removeDMTask(id, task_id)),
    }
}

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
    
    constructor(props) {
        super(props);
        this.onCheck = this.onCheck.bind(this);
        this.onDateButtonClick = this.onDateButtonClick.bind(this);
        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onRankChange = this.onRankChange.bind(this);
    }

    componentDidMount() {
        // Don't get data on remounting if the data is already in the state.
        if (!this.props.taskList.length) {
            // get the current date, slice it to work with database.
            let date = new Date().toISOString().slice(0,10);
            this.props.onRequestDMTaskList(1, date)
        }
    }

    // On check event for each task.
    onCheck(event) {
        // Send toggling task action.
        this.props.onToggleDMTask(1, this.props.taskList[event.target.id]['task_id'], event.target.id, event.target.checked) 
    }

    // Change date when the button is clicked.
    onDateButtonClick(event) {
        // Send request for date change.
        this.props.onRequestDMTaskList(1, this.props.date, Number(event.target.value));
    }

    onAddTaskClick(inputField) {
        // create new task array item.
        if(inputField.value !== '') {
            // calculate rank by finding max of current ranks + 1.
            let rank = Math.max.apply(Math, this.props.taskList.map(task=> {return task.rank +1}))
            this.props.onAddDMTask(1, inputField.value, rank);
            // clear input field.
            inputField.value = ''
        }
    }

    // Handles removing the task from the task list and updating state when editing is enabled.
    onRemoveTask(id) {
        this.props.onRemoveTask(1, this.props.taskList[id]['task_id']);
    }

    // Handles changing the order of tasks on the task list when editing is enabled.
    onRankChange(id, change) {
        if (id + change >= 0 && id + change < this.props.taskList.length) {
            this.props.onSwapTaskRanks(id, id+change);
        }
    }

    // Handles saving updated data when save is clicked after editing.
    onSaveClick() {
        this.props.onEditToggle(false);
        let tasksToUpdate = this.props.taskList.filter((task => task['updated']))
        if (tasksToUpdate.length) {
            console.log("UPDATE");
            this.props.onSaveClick(1, tasksToUpdate);
        }
    }

    render() {
        const { date, editing, taskList, onEditToggle, onTaskTextChange } = this.props;
        console.log("TASKLIST", taskList);
        return (
            <section className="ma0 pa1 pa3-ns bt black-90 bg-light-gray tc">
                <h1 className="ma1 mh2 ">Daily Maintenance</h1>
                <p className="ma2 mh4">
                    A list of tasks you need to get done throughout the day to stay healthy.
                </p>
                <DMDateNav
                    date={date}
                    onClick={this.onDateButtonClick}
                />
                {console.log('task state on render', taskList)}
                { taskList
                ? taskList.map((task, index) => {
                    //console.log(task);
                    //console.log(this.state.editing);
                    return (
                        <TaskItem
                            checkbox={"checkbox"}
                            checked={task['completed']}
                            editing={editing}
                            id={index}
                            key={task['task_id']}
                            onChange={onTaskTextChange}
                            onCheck={this.onCheck}
                            onRemove={this.onRemoveTask}
                            onRankChange={this.onRankChange}
                            task={task['task']}
                        />
                    )
                })
                : null
                }
                <InputField
                    placeholder={inputPlaceholder}
                    onClick={this.onAddTaskClick}
                />
                { editing ?
                    <button 
                    type="button"
                    className="f6 fr dim ph3 pv2 mb2 dib white bg-black w-20 pa3 ma2"
                    onClick={this.onSaveClick}
                    value='false'
                    >Save</button>
                :
                    <button 
                        type="button"
                        className="f6 fr dim ph3 pv2 mb2 dib white bg-black w-20 pa3 ma2"
                        onClick={() => onEditToggle(true)}
                        value='true'
                    >Edit</button>
                }
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMaintenance);
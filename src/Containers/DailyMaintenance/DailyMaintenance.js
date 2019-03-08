import { connect } from 'react-redux'
import InputField from '../../Components/InputField/InputField'
import DMDateNav from '../../Components/DMDateNav/DMDateNav'
import React from 'react'
import TaskItem from './TaskItem/TaskItem'


import { setDMEditing, requestDMTasks } from '../../actions'

const inputPlaceholder = "Enter a task to add..."

const mapStateToProps = state => {
    return {
        editing: state.setDMEditing.dm_editing,
        taskList: state.requestDMTaskList.dm_taskList,
        taskListError: state.requestDMTaskList.dm_error,
        taskListIsPending: state.requestDMTaskList.dm_isPending,
        date: state.requestDMTaskList.dm_date
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onEditClick: (event) => dispatch(setDMEditing(true)),
        onSaveClick: (event) => dispatch(setDMEditing(false)),
        onRequestDMTaskList: (id, date, change) => dispatch(requestDMTasks(id, date, change))//requestDMTasks(dispatch)
    }
}

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],

        }
        this.onCheck = this.onCheck.bind(this);
        this.onDateButtonClick = this.onDateButtonClick.bind(this);
        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onTaskChange = this.onTaskChange.bind(this);
        this.onRankChange = this.onRankChange.bind(this);
    }

    // componentWillUnmount() {
    //     if (this.state.taskList.length) {
    //         let date = new Date().toISOString().slice(0,10);
    //         fetch(this.props.serverURL+'/dm/'+this.props.user_id+'/'+date, {
    //             method: 'PUT',
    //             headers: {'Content-Type' : 'application/json'},
    //             body: JSON.stringify({
    //                 tasks: this.state.taskList
    //             })
    //         })
    //     }
    // }

    componentDidMount() {
        // retrieve task list if we do not have it.
        // if (!this.state.taskList.length) {
        //     let date = new Date().toISOString().slice(0,10);
        //     fetch(this.props.serverURL + '/dm/' + this.props.user_id + '/' + date, {
        //         method: 'GET',
        //         headers: {'Content-Type' : 'application/json'},
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('data fetched', data);
        //         if (Array.isArray(data) && data.length) {
        //             let tasks = data.map(task => {
        //                 task['updated'] = false;
        //                 return task;
        //             })
        //             // Set state of the task list to the data recieved.
        //             this.setState({taskList: tasks, date:tasks[0]['date'].slice(0,10)});
        //         } else {
        //             // No data was found for the user for that date.
        //         }
        //     })
        // }
        // Don't get data on remounting if the data is already in the state.
        if (!this.props.taskList.length) {
            let date = new Date().toISOString().slice(0,10);
            this.props.onRequestDMTaskList(1, date)
        }
    }

    // On check event for each task.
    onCheck(event) {
        console.log(event.target.id + " Checked?: " + event.target.checked)

        fetch(this.props.serverURL + '/dm/' + this.props.user_id + '/' + this.state.taskList[event.target.id]['task_id'] + '/' + event.target.checked, {
            method: 'PUT',
        })
        .then(response => response.json())
        .then(data => console.log(data))
        // get current state for the task item.
        let currentTasks = this.state.taskList;
        // change the bool value to mark as complete or not
        currentTasks[event.target.id]['completed'] = event.target.checked;
        // set state of the tasklist item to the updated state array
        this.setState({taskList:currentTasks});
    }

    // Change date when the button is clicked.
    onDateButtonClick(event) {
        // Send request for date change.
        this.props.onRequestDMTaskList(1, this.props.date, Number(event.target.value));
    }

    onAddTaskClick(inputField) {
        // create new task array item.
        if(inputField.value !== '') {
            fetch(this.props.serverURL + '/dm/' + this.props.user_id, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    task: inputField.value,
                    rank: Math.max.apply(Math, this.state.taskList.map(task=> {return task.rank +1}))
                })
            })
            .then (response => response.json())
            .then (newTask => {
                if (newTask.length) {
                    // task was inserted and returned successfully.
                    console.log(newTask)
                    // update task list state.
                    let currentTasks = this.state.taskList;
                    currentTasks.push(newTask[0]);
                    this.setState({taskList: currentTasks});
                    // clear input field.
                    inputField.value = '';
                }
            });
        }
    }

    // Updates taskList state of id to event's value.
    onTaskChange(event, id) {
        let currentState = this.state.taskList;
        currentState[id]['task'] = event.target.value;
        currentState[id]['updated'] = true;
        this.setState({taskList: currentState})
    }

    // Handles removing the task from the task list and updating state when editing is enabled.
    onRemoveTask(id) {
        console.log("Remove Id:", id);
        fetch(this.props.serverURL + '/dm/'+this.props.user_id + '/' + this.state.taskList[id]['task_id'], {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let currentTasks = this.state.taskList;
            currentTasks.splice(id,1);
            this.setState({taskList: currentTasks});
        })
    }

    // Handles changing the order of tasks on the task list when editing is enabled.
    onRankChange(id, change) {
        if (id + change >= 0 && id + change < this.state.taskList.length) {
            let currentTasks = this.state.taskList;

            // swap the ranks.
            let rank = currentTasks[id]['rank'];
            currentTasks[id]['rank'] = currentTasks[id+change]['rank'];
            currentTasks[id+change]['rank'] = rank;

            // swap their order in the stored state list.
            let temp = currentTasks[id];
            currentTasks[id] = currentTasks[id+change];
            currentTasks[id+change] = temp;

            // set them both as updated.
            currentTasks[id]['updated'] = true;
            currentTasks[id+change]['updated'] = true;

            // update the task list state.
            this.setState({taskList: currentTasks});
        }
    }

    // Handles switching between editing and not editing.
    // onEditClick() {
    //     this.setState({editing : !this.state.editing});
    // }

    // Handles saving updated data when save is clicked after editing.
    onSaveClick() {
        this.setState({editing : !this.state.editing});
        // send fetches to backend database to update any changes to database order and text.
        // filter to only send tasks that need updating when save is pressed.
        let tasksToUpdate = this.state.taskList.filter((task => task['updated']))
        if (tasksToUpdate.length) {
            console.log('updated', tasksToUpdate);
            fetch(this.props.serverURL + '/dm/' + this.props.user_id, {
                method: 'PUT',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    tasks: tasksToUpdate
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                let tasks = this.state.taskList;
                tasks.map(task => task['updated'] = false)
                this.setState({taskList: tasks});
            })
            .catch(err=> console.log(err));
        }
    }


    // editing: state.setDMEditing.dm_editing,
    // taskList: state.requestDMTaskList.dm_taskList,
    // taskListError: state.requestDMTaskList.dm_error,
    // taskListIsPending: state.requestDMTaskList.dm_isPending,
    // date: state.requestDMTaskList.dm_date

    render() {
        const { date, editing, taskList, onEditClick, onSaveClick } = this.props;
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
                            onChange={this.onTaskChange}
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
                    onClick={onSaveClick}
                    value='false'
                    >Save</button>
                :
                    <button 
                        type="button"
                        className="f6 fr dim ph3 pv2 mb2 dib white bg-black w-20 pa3 ma2"
                        onClick={onEditClick}
                        value='true'
                    >Edit</button>
                }
            </section>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMaintenance);
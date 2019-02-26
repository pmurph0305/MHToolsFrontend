import InputField from '../../Components/InputField/InputField'
import DMDateNav from '../../Components/DMDateNav/DMDateNav'
import React from 'react'
import TaskItem from './TaskItem/TaskItem'

// Example task list data.
const taskList = [
    ["Wake up at 8 am", false, "02/25/2019"],
    ["Eat breakfast", true, "02/25/2019"],
    ["Go for a 30 minute walk", false, "02/25/2019"],
    ["Exercitation in minim Lorem veniam laboris consectetur laborum amet exercitation adipisicing. Dolor nisi elit fugiat occaecat aliquip eiusmod officia. Est magna labore proident cupidatat incididunt quis laboris eiusmod. Aute pariatur adipisicing do est tempor irure ad nulla velit irure. Ex amet proident est mollit labore sint esse. Aliquip sint commodo qui sint velit. Ex velit pariatur dolor ut anim voluptate culpa. Commodo reprehenderit eiusmod laboris excepteur cillum et reprehenderit id qui qui laborum nulla voluptate.", false, "02/25/2019"]
]

const displayedDate = "02/25/2019"

const inputPlaceholder = "Enter a task to add..."

let taskItems = [];

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            taskList: taskList,
            date: displayedDate,
            editing: false
        }
        this.onCheck = this.onCheck.bind(this);
        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onTaskChange = this.onTaskChange.bind(this);
    }

    // On check event for each task.
    onCheck(event) {
        console.log(event.target.id + " Checked?: " + event.target.checked)
        // get current state for the task item.
        let currentState = this.state.taskList[event.target.id];
        // change the bool value to mark as complete or not
        currentState[1] = event.target.checked;
        // set state of the tasklist item to the updated state array
        this.setState(Object.assign(this.state.taskList[event.target.id], currentState));
    }

    // Change date when the button is clicked.
    onDateButtonClick(event) {
        console.log("DateChange " + event.target.value)
        if (event.target.value === "prev") {
            console.log("Previous");
        } else if (event.target.value === "next") {
            console.log("Next");
        }
    }

    onAddTaskClick(inputField) {
        // create new task array item.
        if(inputField.value !== '') {
            let taskItem = [inputField.value, false, "02/25/2019"]
            // update task list state.
            let currentTasks = this.state.taskList;
            currentTasks.push(taskItem);
            this.setState(Object.assign(this.state.taskList, currentTasks));
            // clear input field.
            inputField.value = '';
        }
    }

    // Updates taskList state of id to event's value.
    onTaskChange(event, id) {
        let currentState = this.state.taskList[id];
        currentState[0] = event.target.value;
        this.setState(Object.assign(this.state.taskList[id], currentState))
    }

    onRemoveTask(id) {
        console.log("state before remove", this.state.taskList);
        
        let currentTasks = this.state.taskList;
        console.log("remove:"+ id + " task:"+currentTasks[id]);
        currentTasks.splice(id,1);
        console.log("spliced task list", currentTasks);
        this.setState(Object.assign(this.state.taskList, currentTasks));
    }

    onEditClick() {
        this.setState({editing : !this.state.editing});
    }


    onSaveClick() {
        this.setState({editing : !this.state.editing});
        if (taskItems) {
            let newTaskState = taskItems.map((task, index) => {
                return ([document.getElementById("task_"+index).value, task.props.checked, displayedDate])
            });
            this.setState(Object.assign(this.state.taskList, newTaskState));
        }
    }

    render() {
        return (
            <section className="ma0 pa1 pa3-ns bt black-90 bg-light-gray tc">
                <h1 className="ma1 mh2 ">Daily Maintenance</h1>
                <p className="ma2 mh4">
                    A list of tasks you need to get done throughout the day to stay healthy.
                </p>
                <DMDateNav
                    date={this.state.date}
                    onClick={this.onDateButtonClick}
                />
                {console.log('task state on render', this.state.taskList)}
                { this.state.taskList
                ? taskItems = this.state.taskList.map((task, index) => {
                    console.log(task);
                    //console.log(this.state.editing);
                    return (
                        <TaskItem
                            checkbox={"checkbox"}
                            checked={task[1]}
                            editing={this.state.editing}
                            id={index}
                            key={index}
                            onChange={this.onTaskChange}
                            onCheck={this.onCheck}
                            onRemove={this.onRemoveTask}
                            task={task[0]}
                        />
                    )
                })
                : null
                }
                <InputField
                    placeholder={inputPlaceholder}
                    onClick={this.onAddTaskClick}
                />
                {   this.state.editing ?
                    <button 
                    type="button"
                    className="f6 fr dim ph3 pv2 mb2 dib white bg-black w-20 pa3 ma2"
                    onClick={this.onSaveClick}
                    >Save</button>
                :
                    <button 
                        type="button"
                        className="f6 fr dim ph3 pv2 mb2 dib white bg-black w-20 pa3 ma2"
                        onClick={this.onEditClick}
                    >Edit</button>
                }
            </section>
        )
    }
}

export default DailyMaintenance;
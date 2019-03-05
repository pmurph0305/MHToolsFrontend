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

// date for list of currently displayed daily maintenance tasks.

// placeholder for input field.
const inputPlaceholder = "Enter a task to add..."

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            taskList: [],
            // taskList: taskList,
            date: '',
            editing: false,
        }
        this.onCheck = this.onCheck.bind(this);
        this.onAddTaskClick = this.onAddTaskClick.bind(this);
        this.onRemoveTask = this.onRemoveTask.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
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
        if (!this.state.taskList.length) {
            let date = new Date().toISOString().slice(0,10);
            fetch(this.props.serverURL + '/dm/' + this.props.user_id + '/' + date, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
            })
            .then(response => response.json())
            .then(data => {
                if (data.length) {
                    let tasks = data.map(task => {
                        task['updated'] = false;
                        return task;
                    })
                    console.log('tasks', tasks);
                    console.log('data fetched', data);
                    // Set state of the task list to the data recieved.
                    this.setState({taskList: tasks, date:data[0].date.slice(0,10)});
                }
            })
          
        }
    }

    // On check event for each task.
    onCheck(event) {
        console.log(event.target.id + " Checked?: " + event.target.checked)
        // get current state for the task item.
        let currentState = this.state.taskList[event.target.id];
        // change the bool value to mark as complete or not
        currentState['completed'] = event.target.checked;
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
        let currentState = this.state.taskList[id];
        currentState['task'] = event.target.value;
        currentState['updated'] = true;
        this.setState(Object.assign(this.state.taskList[id], currentState))
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
            this.setState(Object.assign(this.state.taskList, currentTasks));
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
            this.setState(Object.assign(this.state.taskList, currentTasks));
        }
    }

    // Handles switching between editing and not editing.
    onEditClick() {
        this.setState({editing : !this.state.editing});
    }

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
                ? this.state.taskList.map((task, index) => {
                    //console.log(task);
                    //console.log(this.state.editing);
                    return (
                        <TaskItem
                            checkbox={"checkbox"}
                            checked={task['completed']}
                            editing={this.state.editing}
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
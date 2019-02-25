import React from 'react'
import TaskItem from './TaskItem/TaskItem'

// Example task list data.
const taskList = [
    ["Wake up at 8 am", false],
    ["Eat breakfast", true],
    ["Go for a 30 minute walk", false],
    ["Exercitation in minim Lorem veniam laboris consectetur laborum amet exercitation adipisicing. Dolor nisi elit fugiat occaecat aliquip eiusmod officia. Est magna labore proident cupidatat incididunt quis laboris eiusmod. Aute pariatur adipisicing do est tempor irure ad nulla velit irure. Ex amet proident est mollit labore sint esse. Aliquip sint commodo qui sint velit. Ex velit pariatur dolor ut anim voluptate culpa. Commodo reprehenderit eiusmod laboris excepteur cillum et reprehenderit id qui qui laborum nulla voluptate.", false]
]

const date = "02/25/2019"

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            taskList: taskList,
            date: date
        }
        this.onCheck = this.onCheck.bind(this);
    }

    // On check event for each task.
    onCheck(event) {
        console.log(event.target.id + " Checked?: " + event.target.checked)
        // get current state for the task item.
        let currentState = this.state.taskList[event.target.id];
        console.log("Current State", currentState);
        // change the bool value to mark as complete or not
        currentState[1] = event.target.checked;
        console.log("New state?:", currentState)
        // set state of the tasklist item to the updated state array
        this.setState(Object.assign(this.state.taskList[event.target.id], currentState));
    }

    render() {
        return (
            <section className="ma0 pa2-ns bt black-90 bg-light-gray tc">
                <h1 className="ma1 mh2 ">Daily Maintenance</h1>
                <p className="ma2 mh4">
                    A list of tasks you need to get done throughout the day to stay healthy.
                </p>
                    { taskList
                    ? taskList.map((task, index) => {
                        console.log(task);
                        return (
                                <TaskItem
                                    task={task[0]}
                                    checked={task[1]}
                                    id={index}
                                    key={index}
                                    onCheck={this.onCheck}
                                    checkbox={"checkbox"}
                                />
                        )
                    })
                    : null
                    }
            </section>
        )
    }
}

export default DailyMaintenance;
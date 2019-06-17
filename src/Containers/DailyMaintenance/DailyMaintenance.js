import { connect } from "react-redux";
import React from "react";

import AlertNotSignedIn from "../../Components/AlertNotSignedIn/AlertNotSignedIn";
import DMDateNav from "../../Components/DMDateNav/DMDateNav";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import InputField from "../../Components/InputField/InputField";
import SectionInfo from "../../Components/SectionInfo/SectionInfo";
import TaskItem from "./TaskItem/TaskItem";

import "./DailyMaintenance.scss";

import {
  requestDMTasks,
  onDMSaveClick,
  swapDMTaskRanks,
  addDMTask,
  toggleDMTask,
  changeDMTaskName,
  changeDMTaskEditing,
  removeDMTask
} from "./Redux/dm_actions";

const inputPlaceholder = "Enter a task to add...";
const currentDate = new Date().toISOString().slice(0, 10);

const mapStateToProps = state => {
  return {
    user_id: state.appReducer.user_id,
    taskList: state.DMReducer.dm_taskList,
    taskListError: state.DMReducer.dm_error,
    taskListIsPending: state.DMReducer.dm_isPending,
    date: state.DMReducer.dm_date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveClick: (id, updatedTasks) =>
      dispatch(onDMSaveClick(id, updatedTasks)),
    onSwapTaskRanks: (index1, index2) =>
      dispatch(swapDMTaskRanks(index1, index2)),
    onRequestDMTaskList: (id, date, change) =>
      dispatch(requestDMTasks(id, date, change)),
    onAddDMTask: (id, task, rank, date) =>
      dispatch(addDMTask(id, task, rank, date)),
    onToggleDMTask: (id, task_id, index, checked) =>
      dispatch(toggleDMTask(id, task_id, index, checked)),
    onTaskTextChange: (id, text) => dispatch(changeDMTaskName(id, text)),
    onRemoveTask: (id, task_id) => dispatch(removeDMTask(id, task_id)),
    onChangeDMTaskEditing: index => dispatch(changeDMTaskEditing(index))
  };
};

// Displays a list of tasks for a specific day
// and renders them in a table where each task can be marked as completed or not.
class DailyMaintenance extends React.Component {
  // Lifecycles:
  componentDidMount() {
    // Don't get data on remounting if the data is already in the state.
    if (!Array.isArray(this.props.taskList) && this.props.user_id) {
      // get the current date, slice it to work with database.
      let date = this.getLocalDate();
      this.props.onRequestDMTaskList(this.props.user_id, date);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user_id !== prevProps.user_id) {
      let date = this.getLocalDate();
      this.props.onRequestDMTaskList(this.props.user_id, date);
    }
  }

  componentWillUnmount() {
    // Save on unmount in case anything has been edited.
    this.onSaveClick();
  }

  getLocalDate = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return (
      date.getFullYear() +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day)
    );
  };

  // Event handlers:
  // Handles when a task is added to the list
  onAddTaskClick = inputField => {
    // create new task array item.
    if (inputField.value !== "") {
      // calculate rank by finding max of current ranks + 1.
      let rank;
      if (this.props.taskList && this.props.taskList.length) {
        rank = Math.max.apply(
          Math,
          this.props.taskList.map(task => {
            return task.rank + 1;
          })
        );
      } else {
        // if rank list doesn't have a length, start at rank 0.
        rank = 0;
      }
      this.props.onAddDMTask(
        this.props.user_id,
        inputField.value,
        rank,
        this.props.date || this.getLocalDate()
      );
      // clear input field.
      inputField.value = "";
    }
  };

  // Handles when a task is marked as complete/incomplete
  onCheck = event => {
    // Send toggling task action.
    this.props.onToggleDMTask(
      this.props.user_id,
      this.props.taskList[event.target.id]["task_id"],
      event.target.id,
      event.target.checked
    );
  };

  // Handles change date button being clicked.
  onDateButtonClick = event => {
    // Save in case anything has been edited.
    this.onSaveClick();
    // Send request for date change.
    if (event.target.value === "1") {
      let date = this.getLocalDate();
      if (date !== this.props.date) {
        this.props.onRequestDMTaskList(
          this.props.user_id,
          this.props.date,
          Number(event.target.value)
        );
      }
    } else {
      this.props.onRequestDMTaskList(
        this.props.user_id,
        this.props.date,
        Number(event.target.value)
      );
    }
  };

  // Handles when edit task icon is clicked.
  onEditClick = id => {
    if (this.props.taskList[id]["editing"] === true) {
      this.onSaveClick();
    }
    this.props.onChangeDMTaskEditing(id);
  };

  // Handles changing the order of tasks on the task list when editing is enabled.
  onRankChange = (id, change) => {
    if (id + change >= 0 && id + change < this.props.taskList.length) {
      this.props.onSwapTaskRanks(id, id + change);
    }
  };

  // Handles removing the task from the task list and updating state when editing is enabled.
  onRemoveTask = id => {
    this.props.onRemoveTask(
      this.props.user_id,
      this.props.taskList[id]["task_id"]
    );
  };

  // Handles saving updated data when save is clicked after editing.
  onSaveClick = () => {
    // make sure there is a list list to save.
    if (this.props.taskList && this.props.taskList.length) {
      // Only update tasks that need updating (have had their rank changed)
      let tasksToUpdate = this.props.taskList.filter(task => task["updated"]);
      if (tasksToUpdate.length) {
        this.props.onSaveClick(this.props.user_id, tasksToUpdate);
      }
    }
  };

  render() {
    const {
      date,
      onTaskTextChange,
      taskList,
      taskListError,
      user_id
    } = this.props;
    // Only allow editing / deleting tasks if it is the list for the current date.
    const allowEditing = date === currentDate ? true : false;

    return (
      <section className="DMSection">
        <SectionInfo
          title={"Daily Maintenance"}
          description={
            "A list of tasks you need to get done throughout the day to stay healthy."
          }
        />
        {!this.props.user_id ? (
          <AlertNotSignedIn ThingsTheyCantDo=" create, or track, your daily maintenance tasks" />
        ) : (
          <>
            <DMDateNav date={date} onClick={this.onDateButtonClick} />
            {taskList && Array.isArray(taskList)
              ? taskList.map((task, index) => {
                  return (
                    <TaskItem
                      allowEditing={allowEditing}
                      checkbox={"checkbox"}
                      checked={task["completed"]}
                      editing={task["editing"]}
                      id={index}
                      key={task["task_id"]}
                      onChange={onTaskTextChange}
                      onCheck={this.onCheck}
                      onEditClick={this.onEditClick}
                      onRemove={this.onRemoveTask}
                      onRankChange={this.onRankChange}
                      task={task["task"]}
                    />
                  );
                })
              : null}
            {/* Display input field only if on current date. */}
            {(!date || date === this.getLocalDate()) && user_id && (
              <InputField
                placeholder={inputPlaceholder}
                buttonTitle={"Add new task"}
                onClick={this.onAddTaskClick}
              />
            )}
          </>
        )}
        {taskListError && <ErrorBox error={taskListError} />}
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyMaintenance);

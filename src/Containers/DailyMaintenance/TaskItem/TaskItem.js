import React from "react";
import ClickableIcon from "../../../Components/ClickableIcon/ClickableIcon";
import "./TaskItem.scss";

/**
 * @param  {string} task Text of the task that is displayed.
 * @param  {number} id Index of the task item in the array
 * @param  {boolean} checked Is the task marked as completed.
 * @param  {} editing Is the user editing the task text.
 * @param  {} allowEditing Can the user edit and save the task.
 * @param  {function} onCheck EventHandler - a task item checkbox is checked
 * @param  {function} onRemove EventHandler - the remove task icon is clicked
 * @param  {function} onChange EventHandler - the task text is changed
 * @param  {function} onRankChange EventHandler - the rank change icon(s) is clicked
 * @param  {function} onEditClick EventHandler - the edit/save task icon is clicked
 */
const TaskItem = ({
	task,
	id,
	onCheck,
	onRemove,
	onChange,
	onRankChange,
	onEditClick,
	checked,
	editing,
	allowEditing
}) => {
	return (
		<div className="taskContainer">
			<div>
                {/* Rank Change Arrows */}
				<ul className="arrowContainer">
					<li>
						<ClickableIcon
							iconName="arrow-up"
							iconSize="small"
							onClick={() => onRankChange(id, -1)}
						/>
					</li>
					<li>
						<ClickableIcon
							iconName="arrow-down"
							iconSize="small"
							onClick={() => onRankChange(id, 1)}
						/>
					</li>
				</ul>

                {/* Edit / Delete Icons */}
				{allowEditing ? (
					<div className="iconContainer">
						{editing ? (
							<ClickableIcon
								iconName="save"
								iconDesc="Save task"
								onClick={() => onEditClick(id)}
							/>
						) : (
							<ClickableIcon
								iconName="create"
								iconDesc="Edit task"
								onClick={() => onEditClick(id)}
							/>
						)}
						<ClickableIcon
							iconName="close"
							iconDesc="Delete task"
							onClick={() => onRemove(id)}
						/>
					</div>
				) : null}
                
                {/* Task text display and input field when editing */}
				<label htmlFor={id}>
					{editing ? (
						<input
							id={"task_" + id}
							className="taskInput"
							value={task}
							label={"Edit task " + id + " text field"}
							aria-label={"Edit task " + id + " text field"}
							onChange={(event) =>
								onChange(id, event.target.value)
							}
						/>
					) : (
						<div className="taskText">{task}</div>
					)}
                    
                    {/* Custom checkbox */}
					<input
						type="checkbox"
						className="hiddenCheckbox"
						id={id}
						onClick={onCheck}
						defaultChecked={checked}
					/>
					<span className="checkmark" />
				</label>
			</div>
		</div>
	);
};

export default TaskItem;

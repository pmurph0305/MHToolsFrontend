import React from "react";
import PropTypes from "prop-types";
import ClickableIcon from "../ClickableIcon/ClickableIcon";
import "./SkillCollapsible.scss";
/**
 * Collapsible - A component that displays a coping skills in a collapsible according. There are buttons displayed for adding, deleting, edit/saving, and sharing.
 * @param  {boolean} allowAdd can the user add this skill to their own coping skills?
 * @param  {boolean} editing is this coping skill currently being edited?
 * @param  {number} index index of coping skill
 * @param  {boolean} shared has the coping skill already been shared?
 * @param  {boolean} shareable is the coping skill shareable to other users?
 * @param  {number} skill_id id of the coping skill
 * @param  {string} text text description of the coping skill
 * @param  {string} title title of the coping skill
 * @callback onAddSharedSkill called when add button is clicked
 * @callback onDeleteSkill called when delete button is clicked.
 * @callback onEditSkill called when edit skill button is clicked.
 * @callback onShareSkill called when share skill button is clicked.
 */
const Collapsible = ({
  allowAdd,
  editing,
  index,
  shared,
  shareable,
  skill_id,
  text,
  title,
  onAddSharedSkill,
  onDeleteSkill,
  onEditSkill,
  onShareSkill
}) => {
  function onCollapisbleClick(title, index) {
    // Get text content element for the skill clicked on.
    let container = document.getElementById("cDescContainer_" + index);
    // Collapsible is closing.
    if (container.style.maxHeight !== "0px" && container.style.maxHeight) {
      // hide container div border & display.
      container.style.borderBottom = "0px";
      container.style.display = "none";
      container.style.maxHeight = "0px";
    } else {
      // collapsible is expanding, so add a border to the container div
      container.style.borderBottom = "1px solid black";
      container.style.display = "block";
      // Set max height to add transition to expanding card.
      container.style.maxHeight = container.scrollHeight + "px";
    }
  }

  function onDescriptionChange(area) {
    if (area) {
      let container = document.getElementById("cDescContainer_" + index);
      // set new container maxHeight to be large enough so there's no jiggle when redoing area height.
      container.style.maxHeight = area.scrollHeight * 2 + "px";
      area.style.height = 0;
      area.style.height = area.scrollHeight + "px";
    }
  }

  return (
    <div>
      {editing ? (
        <input
          id={"cTitle_" + index}
          className="collapsibleTitleInput"
          type="text"
          defaultValue={title}
        />
      ) : (
        <button
          className="collapsible"
          id={"cTitle_" + index}
          value={title}
          onClick={event => onCollapisbleClick(event.target, index)}
        >
          {title}
        </button>
      )}
      <div id={"cDescContainer_" + index} className="collapsibleContent">
        {editing ? (
          <textarea
            id={"cDescArea_" + index}
            defaultValue={text}
            placeholder="Coping Skill Description"
            type="text"
            aria-describedby="New Task"
            className="collapsibleTextArea"
            rows="0"
            onChange={event => onDescriptionChange(event.target)}
          />
        ) : (
          <p className="collapsibleText" id={"cDesc_" + index}>
            {text}
          </p>
        )}
        {shareable && !shared && !editing ? ( // Is a user's created skill, and able to be shared.
          <ClickableIcon
            iconName="share-alt"
            onClick={() => onShareSkill(skill_id)}
          />
        ) : null}
        {!allowAdd && !editing ? ( // Not viewing shared skills, allow editing and deletion.
          <>
            <ClickableIcon
              iconName="close"
              onClick={() => onDeleteSkill(index, skill_id)}
            />
            <ClickableIcon
              iconName="create"
              onClick={() => onEditSkill(index)}
            />
          </>
        ) : editing ? (
          // Need <> to auto expand container to fit clickable icon.
          <>
            <ClickableIcon iconName="save" onClick={() => onEditSkill(index)} />
          </>
        ) : (
          // viewing shared skills, can only add skill.
          <ClickableIcon
            iconName="add-circle-outline"
            onClick={() => onAddSharedSkill(skill_id)}
          />
        )}
      </div>
    </div>
  );
};

Collapsible.propTypes = {
  allowAdd: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  index: PropTypes.number.isRequired,
  shared: PropTypes.bool.isRequired,
  shareable: PropTypes.bool.isRequired,
  skill_id: PropTypes.number.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  onAddSharedSkill: PropTypes.func.isRequired,
  onDeleteSkill: PropTypes.func.isRequired,
  onEditSkill: PropTypes.func.isRequired,
  onShareSkill: PropTypes.func.isRequired
};

export default Collapsible;

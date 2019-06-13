import React, { useState } from "react";
import PropTypes from "prop-types";

import InputCheckbox from "../InputCheckbox/InputCheckbox";
import InputField from "../InputField/InputField";
import InputText from "../InputText/InputText";
import InputTextArea from "../InputTextArea/InputTextArea";

import "./AddSkill.scss";

/**
 * AddSkill - Returns a component that contains inputs and text areas for creating a new coping skill.
 * @callback onAddSkill Callback when add skill button is clicked
 */
export const AddSkill = ({ onAddSkill }) => {
  const [addNewSkill, setNewSkill] = useState("");

  const addSkill = () => {
    console.log("add skill");
    onAddSkill();
    setNewSkill("");
  };

  return (
    <div className="add-skill-container">
      {!addNewSkill && (
        <InputField
          placeholder={"Enter a title for a new coping skill"}
          onClick={element => setNewSkill(element.value)}
          buttonTitle={"Create New Coping Skill"}
        />
      )}
      {addNewSkill && (
        <>
          <InputText
            defaultValue={addNewSkill}
            inputLabel="Coping Skill Title"
            placeholder="Enter a title for a new coping skill."
            idAndName="add_skill_title"
          />
          <InputTextArea
            idAndName="add_skill_description"
            inputLabel="Coping Skill Description"
            placeholder="Enter a description on how the coping skill is used."
          />
          <div className="add-skill-extras-container">
            <InputCheckbox idAndName="add_skill_share" label="Share Skill" />
            <button className="add-skill-button" onClick={addSkill}>
              Add skill
            </button>
          </div>
        </>
      )}
    </div>
  );
};

AddSkill.propTypes = {
  onAddSkill: PropTypes.func.isRequired
};

export default AddSkill;

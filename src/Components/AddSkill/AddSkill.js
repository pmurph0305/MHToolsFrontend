import React from "react";
import PropTypes from "prop-types";

export const AddSkill = ({ onAddSkill }) => {
  return (
    <div className="pv4">
      <label htmlFor="add_skill_title" className="f6 tl b db mb2">
        Add new coping skill:
      </label>
      <input
        placeholder="Coping Skill Title"
        id="add_skill_title"
        type="text"
        label="Coping Skill Title Input"
        aria-label="Coping Skill Title Input"
        className="f6 f5-l input-reset fl black-80 bg-white pa2 lh-solid w-100 br2-ns br--left-ns"
      />

      <textarea
        rows="4"
        placeholder="Coping Skill Description"
        id="add_skill_description"
        type="text"
        label="Coping Skill Description Input"
        aria-label="Coping Skill Description Input"
        className="f6 f5-l input-reset fl black-80 bg-white mv2 pa2 lh-solid w-100 br2-ns br--left-ns"
      />
      <div className="fl">
        Share skill:{" "}
        <input
          type="checkbox"
          label="share skill checkbox"
          aria-label="share skill checkbox"
          id="add_skill_share"
        />
      </div>
      <button
        type="button"
        className="f6 f5-l babutton-reset fr pv2 tc db bn bg-animate bg-dark-green hover-bg-black-70 white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
        onClick={onAddSkill}
      >
        Add new skill.
      </button>
    </div>
  );
};

AddSkill.propTypes = {
  onAddSkill: PropTypes.func.isRequired
};

export default AddSkill;

import { shallow, mount } from "enzyme";
import React from "react";
import SkillCollapsible from "./SkillCollapsible";

describe("skill collapsible tests", () => {
  let mockAddSkill = jest.fn(val => val);
  let mockEditSkill = jest.fn(val => val);
  let mockShareSkill = jest.fn(val => val);
  let mockDeleteSkill = jest.fn((val, val2) => [val, val2]);

  // not editing their own skill
  let mockProps = {
    allowAdd: false,
    editing: false,
    index: 1,
    shared: false,
    shareable: true,
    skill_id: 2,
    text: "test descrption",
    title: "test title",
    onDeleteSkill: mockDeleteSkill,
    onEditSkill: mockEditSkill,
    onShareSkill: mockShareSkill,
    onAddSharedSkill: mockAddSkill
  };

  let wrapper = shallow(<SkillCollapsible {...mockProps} />, {
    attachTo: document.body
  });
  it("displays text and title correctly", () => {
    expect(wrapper.find(".collapsibleText").text()).toBe(mockProps.text);
    expect(wrapper.find(".collapsible").text()).toBe(mockProps.title);
  });

  it("delete, edit, share called", () => {
    wrapper.find('[iconName="close"]').simulate("click");
    expect(mockDeleteSkill).toHaveBeenCalledTimes(1);
    wrapper.find('[iconName="create"]').simulate("click");
    expect(mockEditSkill).toHaveBeenCalledTimes(1);
    wrapper.find('[iconName="share-alt"]').simulate("click");
    expect(mockShareSkill).toHaveBeenCalledTimes(1);

    expect(mockShareSkill.mock.results[0].value).toBe(2);
    expect(mockEditSkill.mock.results[0].value).toBe(1);
    expect(mockDeleteSkill.mock.results[0].value).toStrictEqual([1, 2]);
  });

  // is editing their own skill
  let mockEditSkill2 = jest.fn(val => val);
  let mockProps2 = {
    allowAdd: false,
    editing: true,
    index: 6,
    shared: false,
    shareable: true,
    skill_id: 3,
    text: "test descrption",
    title: "test title",
    onDeleteSkill: mockDeleteSkill,
    onEditSkill: mockEditSkill2,
    onShareSkill: mockShareSkill,
    onAddSharedSkill: mockAddSkill
  };
  let wrapper2 = shallow(<SkillCollapsible {...mockProps2} />);

  it("calls save correctly", () => {
    wrapper2.find('[iconName="save"]').simulate("click");
    expect(mockEditSkill2).toHaveBeenCalledTimes(1);
    expect(mockEditSkill2.mock.results[0].value).toBe(6);
  });

  // another users addable skill.
  let mockProps3 = {
    allowAdd: true,
    editing: false,
    index: 6,
    shared: false,
    shareable: true,
    skill_id: 3,
    text: "test descrption",
    title: "test title",
    onDeleteSkill: mockDeleteSkill,
    onEditSkill: mockEditSkill2,
    onShareSkill: mockShareSkill,
    onAddSharedSkill: mockAddSkill
  };
  let wrapper3 = shallow(<SkillCollapsible {...mockProps3} />);

  it("calls add shared skill correctly", () => {
    wrapper3.find('[iconName="add-circle-outline"]').simulate("click");
    expect(mockAddSkill).toHaveBeenCalledTimes(1);
    expect(mockAddSkill.mock.results[0].value).toBe(3);
  });
});

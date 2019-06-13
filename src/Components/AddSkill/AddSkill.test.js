import { mount } from "enzyme";
import React from "react";
import AddSkill from "./AddSkill";

describe("AddSkill tests", () => {
  let mockOnAddSkill = jest.fn(val => val);
  const wrapper = mount(<AddSkill onAddSkill={mockOnAddSkill} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

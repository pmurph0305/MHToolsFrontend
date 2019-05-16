import { shallow } from "enzyme";
import React from "react";
import AddSkill from "./AddSkill";

describe("AddSkill tests", () => {
  let mockOnAddSkill = jest.fn(val => val);
  const wrapper = shallow(<AddSkill onAddSkill={mockOnAddSkill} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onAddSkill correctly", () => {
    wrapper.find("button").simulate("click");
    expect(mockOnAddSkill).toHaveBeenCalledTimes(1);
  });
});

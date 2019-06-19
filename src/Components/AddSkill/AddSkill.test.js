import { shallow } from "enzyme";
import React from "react";
import AddSkill from "./AddSkill";

describe("AddSkill tests", () => {
  let mockOnAddSkill = jest.fn(val => val);
  const wrapper = shallow(<AddSkill onAddSkill={mockOnAddSkill} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallow } from "enzyme";
import React from "react";
import DisplayTextBox from "./DisplayTextBox";

describe("TextBox Tests", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<DisplayTextBox />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Should contain text", () => {
    wrapper.setProps({ text: "testing" });
    expect(wrapper.text()).toEqual("testing");
  });

  it("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

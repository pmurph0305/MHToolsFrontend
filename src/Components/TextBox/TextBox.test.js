import { shallow } from "enzyme";
import React from "react";
import TextBox from "./TextBox";

describe("TextBox Tests", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<TextBox />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Should contain text", () => {
    wrapper.setProps({ text: "testing" });
    expect(wrapper.text()).toEqual("testing");
  });
});

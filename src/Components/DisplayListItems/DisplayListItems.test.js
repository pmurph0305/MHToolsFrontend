import { shallow } from "enzyme";
import React from "react";
import DisplayListItems from "./DisplayListItems";

describe("TextBox Tests", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<DisplayListItems />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Should contain text", () => {
    wrapper.setProps({ items: ["a", "b", "c"] });
    expect(wrapper.text()).toEqual("testing");
  });
});

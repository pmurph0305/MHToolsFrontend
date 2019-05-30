import { shallow } from "enzyme";
import React from "react";
import DisplayListItems from "./DisplayListItems";

describe("TextBox Tests", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<DisplayListItems />)));

  it("Renders 2 divs", () => {
    expect(wrapper.find("div").length).toEqual(2);
  });

  it("Should display the label", () => {
    wrapper.setProps({ label: "testlabel" });
    expect(wrapper.text()).toEqual("testlabel");
  });

  it("Should contain text", () => {
    wrapper.setProps({ items: ["a", "b", "c"] });
    expect(wrapper.text()).toEqual("abc");
  });

  it("Should contain correct number of p tags", () => {
    wrapper.setProps({ items: ["a", "b", "c"] });
    expect(wrapper.find("p").length).toEqual(3);
  });

  it("Should not contain text if there is no text", () => {
    expect(wrapper.text()).toEqual("");
  });

  it("Should not contain text if items has no length", () => {
    wrapper.setProps({ items: null });
    expect(wrapper.text()).toEqual("");
  });

  it("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

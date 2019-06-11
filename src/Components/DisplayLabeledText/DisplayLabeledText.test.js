import React from "react";
import { shallow } from "enzyme";
import DisplayLabeledText from "./DisplayLabeledText";

describe("DisplayLabeledText tests", () => {
  let wrapper;
  let mockProps = {
    label: "test",
    text: "test text"
  };
  beforeEach(() => (wrapper = shallow(<DisplayLabeledText {...mockProps} />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Displays a label correctly", () => {
    wrapper.setProps({ label: "test" });
    expect(wrapper.find("label").text()).toEqual("test");
  });

  it("Displays text correctly", () => {
    wrapper.setProps({ text: "test text" });
    expect(wrapper.find("p").text()).toEqual("test text");
  });

  it("Displays both a label and text correctly", () => {
    wrapper.setProps({ label: "testLabel", text: "testText" });
    expect(wrapper.text()).toEqual("testLabeltestText");
  });

  it("Matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

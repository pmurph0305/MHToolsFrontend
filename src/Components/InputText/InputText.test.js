import React from "react";
import { shallow } from "enzyme";
import InputText from "./InputText";

describe("InputText Tests", () => {
  it("Renders correctly with no props", () => {
    let wrapper = shallow(<InputText />);
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.find("input").length).toEqual(1);
    expect(wrapper.find("label").length).toEqual(0);
    expect(wrapper.find("input").prop("id")).toEqual("input-text");
    expect(wrapper.find("input").prop("name")).toEqual("input-text");
  });

  it("Renders correctly with all props", () => {
    let wrapper = shallow(
      <InputText
        defaultValue="testDefaultValue"
        inputLabel="testLabel"
        placeholder="testPlaceholder"
        idAndName="testIdAndName"
      />
    );
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.find("input").length).toEqual(1);
    expect(wrapper.find("label").length).toEqual(1);
    expect(wrapper.find("input").prop("defaultValue")).toEqual(
      "testDefaultValue"
    );
    expect(wrapper.find("input").prop("placeholder")).toEqual(
      "testPlaceholder"
    );
    expect(wrapper.find("input").prop("id")).toEqual("testIdAndName");
    expect(wrapper.find("input").prop("name")).toEqual("testIdAndName");
    expect(wrapper.find("label").text()).toEqual("testLabel");
  });

  it("Calls on change when text is entered", () => {
    let mockChange = jest.fn();
    let wrapper = shallow(<InputText onChange={mockChange} />);
    wrapper.find("input").simulate("change");
    expect(mockChange).toHaveBeenCalledTimes(1);
  });
});

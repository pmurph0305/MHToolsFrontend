import React from "react";
import { shallow, mount } from "enzyme";
import InputTextArea from "./InputTextArea";

describe("InputTextArea Tests", () => {
  it("Renders correctly with no props", () => {
    let wrapper = mount(<InputTextArea />);
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.find("textarea").length).toEqual(1);
    expect(wrapper.find("textarea").prop("id")).toEqual("form-input-textarea");
    expect(wrapper.find("textarea").prop("name")).toEqual(
      "form-input-textarea"
    );
    expect(wrapper.find("textarea").prop("placeholder")).toEqual("");
    expect(wrapper.find("label").length).toEqual(0);
    expect(wrapper.find("p").length).toEqual(0);
  });

  it("Renders correctly with props", () => {
    let wrapper = mount(
      <InputTextArea
        idAndName="testIdAndName"
        inputLabel="testLabel"
        inputDesc="testDesc"
        placeholder="testPlaceholder"
      />
    );
    expect(wrapper.find("div").length).toEqual(2);
    expect(wrapper.find("textarea").length).toEqual(1);
    expect(wrapper.find("textarea").prop("id")).toEqual("testIdAndName");
    expect(wrapper.find("textarea").prop("name")).toEqual("testIdAndName");
    expect(wrapper.find("textarea").prop("placeholder")).toEqual(
      "testPlaceholder"
    );
    expect(wrapper.find("label").text()).toEqual("testLabel");
    expect(wrapper.find("p").text()).toEqual("testDesc");
  });

  it("Calls onTextAreaChange on text area change", () => {
    let wrapper = mount(<InputTextArea />);
    const spyChange = jest.spyOn(wrapper.instance(), "onTextAreaChange");
    wrapper.instance().forceUpdate();
    wrapper.find("textarea").simulate("change");
    expect(spyChange).toHaveBeenCalledTimes(1);
  });

  it("Gets bottom padding correctly", () => {
    let wrapper = mount(<InputTextArea />);
    let t = wrapper.instance().getBottomPadding();
    expect(t).toEqual(2);
  });
});

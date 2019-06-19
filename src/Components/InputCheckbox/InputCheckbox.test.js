import React from "react";
import { shallow } from "enzyme";
import InputCheckbox from "./InputCheckbox";

describe("InputCheckbox Tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InputCheckbox label="testLabel" idAndName="testID" />);
  });

  it("Displays the label text", () => {
    expect(wrapper.find(".input-checkbox-label").text()).toEqual("testLabel");
  });

  it("Sets the checkbox to the correct name and id", () => {
    let props = wrapper.find(".input-checkbox").props();
    expect(wrapper.find("#testID").length).toEqual(1);
    expect(wrapper.find(`[name="testID"]`).length).toEqual(1);
  });
});

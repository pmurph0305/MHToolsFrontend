import React from "react";
import { mount, shallow } from "enzyme";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import InputCheckboxList from "./InputCheckboxList";

describe("InputCheckboxList Tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <InputCheckboxList
        checkboxList={["abc", "def"]}
        inputLabel="testLabel"
        inputDesc="testDesc"
      />
    );
  });

  it("Displays 2 checkboxes correctly.", () => {
    expect(wrapper.find(InputCheckbox).length).toEqual(2);
    expect(
      wrapper
        .find(InputCheckbox)
        .first()
        .text()
    ).toEqual("abc");
    expect(
      wrapper
        .find(InputCheckbox)
        .last()
        .text()
    ).toEqual("def");
  });

  it("Displays the label", () => {
    expect(wrapper.find(".input-checkbox-list-label").text()).toEqual(
      "testLabel"
    );
  });

  it("Displays the description correctly", () => {
    expect(wrapper.find(".input-checkbox-list-description").text()).toEqual(
      "testDesc"
    );
  });

  it("Doesnt display the desc if none is provided", () => {
    let wrapper2 = shallow(
      <InputCheckboxList checkboxList={["abc", "def"]} inputLabel="testLabel" />
    );
    expect(wrapper2.find(".input-checkbox-list-description").length).toEqual(0);
  });
});

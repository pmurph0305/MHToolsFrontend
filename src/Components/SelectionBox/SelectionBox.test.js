import { shallow } from "enzyme";
import React from "react";
import SelectionBox from "./SelectionBox";

describe("Selection Box tests", () => {
  const mockOnChange = jest.fn(val => val);
  const mockProps = {
    options: ["a", "b", "c", "d"],
    id: 1,
    value: 3,
    className: "TestClass",
    label: "TestLabel",
    onChange: mockOnChange
  };
  const wrapper = shallow(<SelectionBox {...mockProps} />);

  it("has correct props", () => {
    expect(wrapper.props().id).toBe(mockProps.id);
    expect(wrapper.prop("value")).toBe(mockProps.value);
    expect(wrapper.prop("className")).toBe(mockProps.className);
    expect(wrapper.prop("label")).toBe(mockProps.label);
    expect(wrapper.prop("aria-label")).toBe(mockProps.label);
  });

  it("has correct options", () => {
    expect(
      wrapper
        .find("option")
        .last()
        .text()
    ).toBe(mockProps.options[mockProps.options.length - 1]);
    expect(wrapper.find("option").length).toBe(4);
    expect(
      wrapper
        .find("option")
        .first()
        .text()
    ).toBe(mockProps.options[0]);
  });

  const wrapper2 = shallow(<SelectionBox />);
  it("correctly sets class to default", () => {
    expect(wrapper2.prop("className")).toBe("DefaultSelect");
  });

  it("calls on change properly", () => {
    wrapper.find("select").simulate("change");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});

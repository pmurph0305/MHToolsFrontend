import { shallow, mount } from "enzyme";
import React from "react";
import InputField from "./InputField";

describe("InputField tests", () => {
  let wrapper;
  const mockClick = jest.fn(val => val);
  let mockProps = {
    onClick: mockClick,
    buttonTitle: "test button",
    placeholder: "test"
  };

  beforeEach(() => {
    wrapper = shallow(<InputField {...mockProps} />);
  });

  // test if exists.
  it("Exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  // snapshot test.
  it("Matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Displays placeholder correctly", () => {
    expect(wrapper.find("input").props().placeholder).toBe("test");
  });

  // mount & simulate a click, make sure the return value is empty as nothing is entered.
  it("Calls on click when button clicked and returns value", () => {
    const wrapmount = mount(<InputField {...mockProps} />);
    wrapmount.find("button").simulate("click");
    expect(mockClick.mock.results[0].value.value).toBe("");
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});

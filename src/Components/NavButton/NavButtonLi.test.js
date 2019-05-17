import { shallow, mount } from "enzyme";
import React from "react";
import NavButtonLi from "./NavButtonLi";

describe("NavButtonLi tests", () => {
  let wrapper;
  let mockRouteChange = jest.fn(val => val);
  const mockProps = {
    buttonLabel: "test label",
    onRouteChange: mockRouteChange,
    route: "test route",
    liClass: "tc"
  };

  beforeEach(() => {
    wrapper = shallow(<NavButtonLi {...mockProps} />);
  });

  it("Exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Displays label correctly", () => {
    expect(wrapper.find("button").text()).toBe(mockProps.buttonLabel);
  });

  it("Has null class if not specified", () => {
    const noclasswrapper = shallow(<NavButtonLi />);
    expect(noclasswrapper.prop("className")).toBe(null);
  });
});

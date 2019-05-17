import { shallow } from "enzyme";
import React from "react";
import NavBar from "./NavBar";

describe("Navbar tests", () => {
  let mockModalChange = jest.fn(val => val);

  const wrapper = shallow(<NavBar onModalChange={mockModalChange} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("route change is called", () => {
    wrapper
      .find("button")
      .last()
      .simulate("click");
    expect(mockModalChange).toHaveBeenCalledTimes(1);
    expect(mockModalChange.mock.results[0].value).toBe("signin");
  });

  it("displays correct number of nav buttons", () => {
    expect(wrapper.find("NavButtonLi").length).toBe(5);
  });
});

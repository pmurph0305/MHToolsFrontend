import { shallow } from "enzyme";
import React from "react";
import NavBar from "./NavBar";

describe("Navbar tests", () => {
  let mockRouteChange = jest.fn(val => val);

  const wrapper = shallow(<NavBar onRouteChange={mockRouteChange} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("route change is called", () => {
    wrapper.find("img").simulate("click");
    expect(mockRouteChange).toHaveBeenCalledTimes(1);
    expect(mockRouteChange.mock.results[0].value).toBe("home");
  });

  it("displays correct number of nav buttons", () => {
    expect(wrapper.find("NavButtonLi").length).toBe(7);
  });
});

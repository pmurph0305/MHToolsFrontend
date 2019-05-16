import React from "react";
import { shallow } from "enzyme";
import ClickableIcon from "./ClickableIcon";

describe("ClickableIcon tests", () => {
  let mockClick = jest.fn(val => val);
  let mockProps = {
    iconName: "share-alt",
    onClick: mockClick,
    iconSize: "small"
  };

  const wrapper = shallow(<ClickableIcon {...mockProps} />);

  it("Exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Responds to clicks", () => {
    wrapper.find("ion-icon").simulate("click");
    expect(mockClick).toHaveBeenCalledTimes(1);
    wrapper.find("ion-icon").simulate("click");
    expect(mockClick).toHaveBeenCalledTimes(2);
  });

  it("Has correct properties", () => {
    expect(wrapper.find('[name="share-alt"]').length).toBe(1);
    expect(wrapper.find('[size="small"]').length).toBe(1);
  });

  it("Sets size to default if no size", () => {
    const defaultwrapper = shallow(<ClickableIcon />);
    expect(defaultwrapper.find('[size="default"]').length).toBe(1);
  });

  it("Matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

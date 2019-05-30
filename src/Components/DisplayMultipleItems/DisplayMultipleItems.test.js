import { shallow } from "enzyme";
import React from "react";
import DisplayMultipleItems from "./DisplayMultipleItems";

describe("TextBox Tests", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<DisplayMultipleItems />)));

  it("Renders a div", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it("Should contain text", () => {
    wrapper.setProps({ items: [{ label: "testlabel", value: "testvalue" }] });
    expect(wrapper.text()).toEqual("testlabeltestvalue");
  });

  it("Should render correct number of labels and p tags.", () => {
    wrapper.setProps({
      items: [
        { label: "testlabel", value: "testvalue" },
        { label: "testlabel2", value: "testvalue2" }
      ]
    });
    expect(wrapper.find("p").length).toEqual(2);
    expect(wrapper.find("label").length).toEqual(2);
  });
});

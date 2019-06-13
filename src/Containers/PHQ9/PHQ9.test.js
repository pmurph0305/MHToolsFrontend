// test file
import { shallow, mount } from "enzyme";
import React from "react";
import { PHQ9 } from "./PHQ9";

describe("PHQ9 tests", () => {
  it("renders PHQ9 snapshot correctly", () => {
    const wrapper = shallow(<PHQ9 />);
    expect(wrapper).toMatchSnapshot();
  });

  it("submits phq9 correctly", () => {
    const mockSubmit = jest.fn();
    const wrapper = mount(<PHQ9 onSubmitPHQ9={mockSubmit} />);
    wrapper.find("button").simulate("click");
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it("gets footers correctly", () => {
    expect.assertions(6);
    const wrapFooters = shallow(<PHQ9 />);
    let footers = wrapFooters.instance().getFooters();
    expect(footers[0]).toEqual("");
    expect(footers[1].type).toEqual("button");

    const wrapFooters2 = shallow(
      <PHQ9 submissionResult="PHQ-9 submission successful." />
    );
    let footers2 = wrapFooters2.instance().getFooters();
    expect(footers2[0].props.children).toEqual("PHQ-9 submission successful.");
    expect(footers2[1].type).toEqual("button");

    const wrapFooters3 = shallow(
      <PHQ9 submissionResult="PHQ-9 submission test fail" />
    );
    let footers3 = wrapFooters3.instance().getFooters();
    expect(footers3[0].props.children).toEqual("PHQ-9 submission test fail");
    expect(footers3[1].type).toEqual("button");
  });

  it("selects and updates answers correctly", () => {
    const wrapper2 = mount(<PHQ9 />);
    expect(wrapper2.exists()).toBe(true);
    const initialAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(wrapper2.state("answers")).toEqual(initialAnswers);
    expect(wrapper2.find("select")).toHaveLength(10);
    const mockEvent = {
      target: {
        id: 0,
        value: 2
      }
    };
    const newAnswers = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    wrapper2
      .find("select")
      .first()
      .simulate("change", mockEvent);
    expect(wrapper2.state("answers")).toEqual(newAnswers);
  });
});

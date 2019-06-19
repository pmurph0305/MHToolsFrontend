import React from "react";
import { shallow } from "enzyme";
import InputRange from "./InputRange";

describe("InputRange Tests", () => {
  it("Renders correctly when no props are given", () => {
    let wrapper = shallow(<InputRange />);
    expect(wrapper.find("div").length).toEqual(2);
    // range slider values
    expect(wrapper.find('[type="range"]').length).toEqual(1);
    expect(wrapper.find('[type="range"]').prop("min")).toEqual(0);
    expect(wrapper.find('[type="range"]').prop("max")).toEqual(100);
    expect(wrapper.find('[type="range"]').prop("defaultValue")).toEqual(50);
    // default id & name
    expect(wrapper.find('[type="range"]').prop("id")).toEqual("input-range");
    expect(wrapper.find('[type="range"]').prop("name")).toEqual("input-range");
    // top label.
    expect(wrapper.find("label").length).toEqual(0);
    //side labels.
    expect(wrapper.find("p").length).toEqual(0);
  });

  it("Uses min and max props correctly to calculate default value", () => {
    let wrapper = shallow(<InputRange min={10} max={50} />);
    expect(wrapper.find('[type="range"]').prop("min")).toEqual(10);
    expect(wrapper.find('[type="range"]').prop("max")).toEqual(50);
    expect(wrapper.find('[type="range"]').prop("defaultValue")).toEqual(30);
  });

  it("Uses defaultValue correctly if supplied", () => {
    let wrapper = shallow(<InputRange min={10} max={50} defaultValue={20} />);
    expect(wrapper.find('[type="range"]').prop("min")).toEqual(10);
    expect(wrapper.find('[type="range"]').prop("max")).toEqual(50);
    expect(wrapper.find('[type="range"]').prop("defaultValue")).toEqual(20);
  });

  it("Displays labels correctly if supplied", () => {
    let wrapper = shallow(
      <InputRange inputLabel="testLabel" minLabel="min" maxLabel="max" />
    );
    expect(wrapper.find("label").text()).toEqual("testLabel");
    expect(
      wrapper
        .find("p")
        .first()
        .text()
    ).toEqual("min");
    expect(
      wrapper
        .find("p")
        .last()
        .text()
    ).toEqual("max");
  });

  it("Applies id and name to input-range if supplied", () => {
    let wrapper = shallow(<InputRange idAndName="inputRangeID" />);
    expect(wrapper.find('[type="range"]').prop("id")).toEqual("inputRangeID");
    expect(wrapper.find('[type="range"]').prop("name")).toEqual("inputRangeID");
  });
});

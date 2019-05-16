import { shallow, mount } from "enzyme";
import React from "react";
import Table from "./Table";

describe("Table tests", () => {
  let wrapper1 = shallow(<Table />);

  it("handles lack of properties", () => {
    expect(wrapper1.exists("table")).toBe(true);
    expect(wrapper1.exists("tbody")).toBe(true);
    expect(wrapper1.exists("thead")).toBe(false);
    expect(wrapper1.find("tr").length).toBe(1);
    expect(wrapper1.exists("tfoot")).toBe(false);
  });

  let mockHeader = "test header";
  let wrapper2 = shallow(<Table headers={mockHeader} />);

  it("handles headers as a single string", () => {
    expect(wrapper2.exists("thead")).toBe(true);
    expect(wrapper2.find("thead").text()).toEqual(mockHeader);
    expect(wrapper2.find("tr").length).toBe(2);
    expect(wrapper2.find("th").length).toBe(1);
  });

  let mockRows = [["t1", "t2"], ["t3", "t4"]];
  let wrapper3 = shallow(<Table rows={mockRows} />);
  it("handles rows as arrays", () => {
    expect(wrapper3.find("td").length).toBe(4);
    expect(
      wrapper3
        .find("td")
        .last()
        .text()
    ).toBe("t4");
  });

  let mockRows2 = ["t1", "t2"];
  let wrapper4 = shallow(<Table rows={mockRows2} />);
  it("handles rows as not arrays", () => {
    expect(wrapper4.find("td").length).toBe(2);
    expect(
      wrapper4
        .find("td")
        .last()
        .text()
    ).toBe("t2");
  });
});

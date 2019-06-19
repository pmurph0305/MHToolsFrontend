import { shallow } from "enzyme";
import React from "react";
import RegisterForm from "./RegisterForm";

describe("RegisterForm tests", () => {
  let mockOnSubmit = jest.fn(val => val);
  let mockOnToggleModal = jest.fn(val => val);
  let mockProps = {
    onSubmitForm: mockOnSubmit,
    onToggleModal: mockOnToggleModal
  };
  const wrapper = shallow(<RegisterForm {...mockProps} />);

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onsubmit", () => {
    wrapper.find("form").simulate("submit");
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls toggle properly", () => {
    wrapper.find('[className="modal-close"]').simulate("click");
    expect(mockOnToggleModal).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");
/**
 * Modal - A component that renders a modal over the current page.
 * Creates a modal root element, and renders the props as children.
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalContainer = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.modalContainer);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modalContainer);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.modalContainer);
  }
}

export default Modal;

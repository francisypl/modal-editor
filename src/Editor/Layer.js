import { createPortal } from "react-dom";

export default function Layer(props) {
  if (!props.children) {
    return null;
  }
  return createPortal(props.children, document.body);
}

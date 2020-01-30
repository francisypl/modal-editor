import React, { useContext } from "react";

import AppStoreContext, { UNSET_MODAL_ACTION } from "../common/AppStoreContext";
import { Icon } from "../Theme/Elements";

export default function Modal() {
  const { state, dispatch } = useContext(AppStoreContext);
  if (state.modal) {
    return (
      <div id="modal">
        <div id="modal-content">
          <Icon
            onClick={() => dispatch({ type: UNSET_MODAL_ACTION })}
            id="modal-close-icon"
            name="close"
          />
          {state.modal}
        </div>
      </div>
    );
  }
  return null;
}

import React, { useContext } from "react";
import ImageEditor from "../Editor/ImageEditor";
import EditorState from "../Editor/ImageEditor/EditorState";

import AppStoreContext from "../common/AppStoreContext";

const state = EditorState.createEmpty();

export default function Modal() {
  // const { state } = useContext(AppStoreContext);
  // if (state.modal) {
  return (
    <div id="modal">
      <div id="modal-content">
        <ImageEditor
          src="https://img1.wsimg.com/isteam/stock/1036"
          height={200}
          width={600}
          cropStyle="sqaure"
          editorState={state}
          config={{ showCropTool: true }}
        />
      </div>
    </div>
  );
  // }
  // return null;
}

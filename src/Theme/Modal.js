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
          src="//img1.wsimg.com/isteam/stock/101785/:/rs=w:500,cg:true,m"
          height={200}
          width={600}
          onCrop={e => console.log(e)}
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

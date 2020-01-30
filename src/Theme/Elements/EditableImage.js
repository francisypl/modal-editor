import React, { useState, useCallback, useContext } from "react";
import cx from "classnames";

import { Image } from "./Image";
// import ImageEditorState from "../../Editor/ImageEditorState";
import Layer from "../../Editor/Layer";
import Align from "../../Editor/Align";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
// import CropEditor from "../../Editor/CropEditor";
import AppStoreContext, {
  SET_MODAL_ACTION
} from "../../common/AppStoreContext";
import ImageEditor from "../../Editor/ImageEditor";

export function EditableImage({ style, editing, src, ...props }) {
  const [showEditOption, setShowEditOption] = useState(false);
  const [ref, setRef] = useState();
  const { dispatch } = useContext(AppStoreContext);

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  function handleStartCrop(cropStyle) {
    dispatch({
      type: SET_MODAL_ACTION,
      payload: <ImageEditor cropStyle={cropStyle} src={src} />
    });
  }

  const showToolbar = showEditOption;
  const imageEditToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar onStartCrop={handleStartCrop} />
      </Align>
    </Layer>
  ) : null;

  return (
    <div
      className={cx("image-edit-container", {
        active: showToolbar
      })}
      ref={saveRef}
      onMouseOver={() => setShowEditOption(true)}
      onMouseLeave={() => setShowEditOption(false)}
    >
      {imageEditToolbar}
      <Image style={{ width: "100%", ...style }} src={src} {...props} />
    </div>
  );
}

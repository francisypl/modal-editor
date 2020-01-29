import React, { useState, useCallback } from "react";
import cx from "classnames";

import { Image } from "./Image";
// import ImageEditorState from "../../Editor/ImageEditorState";
import Layer from "../../Editor/Layer";
import Align from "../../Editor/Align";
import ImageToolbar from "../../Editor/ImageEditor/Toolbar";
import CropEditor from "../../Editor/CropEditor";
import * as cropStyles from "../../constants/cropStyles";

export function EditableImage({ style, editing, ...props }) {
  const [showEditOption, setShowEditOption] = useState(false);
  const [showCropEditor, setShowCropEditor] = useState(editing);
  const [cropStyle, setCropStyle] = useState(cropStyles.freeform);
  const [ref, setRef] = useState();

  const saveRef = useCallback(ref => {
    setRef(ref);
  }, []);

  function handleStartCrop(cropStyle) {
    setShowCropEditor(true);
    setCropStyle(cropStyle);
  }

  const showToolbar = showEditOption && !showCropEditor;
  const imageEditToolbar = showToolbar ? (
    <Layer>
      <Align node={ref} offset={{ top: 47, left: -10 }}>
        <ImageToolbar onStartCrop={handleStartCrop} />
      </Align>
    </Layer>
  ) : null;

  const shouldDisplayImage = !showCropEditor;

  const imgEl = <Image style={{ width: "100%", ...style }} {...props} />;

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
      {shouldDisplayImage && imgEl}
      {showCropEditor && (
        <CropEditor cropStyle={cropStyle} src={props.src}>
          {imgEl}
        </CropEditor>
      )}
    </div>
  );
}

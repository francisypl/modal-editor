const defaultState = {
  crop: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%"
  },
  scale: 1,
  rotation: 0,
  flip: {
    horizontal: false,
    vertical: false
  },
  focalPoint: {
    top: "50%",
    left: "50%"
  },
  effects: {
    grayscale: false
  },
  saturation: 0
};

export default class EditorState {
  static createEmpty() {
    return EditorState.createFromState();
  }

  static createFromState(editorState = {}) {
    return new EditorState({ ...defaultState, ...editorState });
  }

  static fromJSON(/* json, settings */) {}

  constructor(editorState, undoStack = [], redoStack = []) {
    this._editorState = editorState;
    this._undoStack = undoStack;
    this._redoStack = redoStack;
  }

  undo() {
    const undoStack = this.undoStack;

    if (!undoStack.length) {
      return this;
    }
    const newState = undoStack.pop();
    return new EditorState(newState, undoStack, this.redoStack.concat(this));
  }

  redo() {
    const redoStack = this.redoStack;

    if (!redoStack.length) {
      return this;
    }
    const newState = redoStack.pop();
    return new EditorState(newState, this.undoStack.concat(this), redoStack);
  }

  toJSON() {}

  get scale() {
    return this._editorState.scale || defaultState.scale;
  }

  get src() {
    return this._editorState.src || defaultState.src;
  }

  get crop() {
    return this._editorState.crop || defaultState.crop;
  }

  get rotation() {
    return this._editorState.rotation || defaultState.rotation;
  }

  get flip() {
    return this._editorState.flip || defaultState.flip;
  }

  get focalPoint() {
    return this._editorState.focalPoint || defaultState.focalPoint;
  }

  get effects() {
    return this._editorState.effects || defaultState.effects;
  }

  get saturation() {
    return this._editorState.saturation || defaultState.saturation;
  }

  get undoStack() {
    return this._undoStack.slice(0);
  }

  get redoStack() {
    return this._redoStack.slice(0);
  }

  applyNewState(newState) {
    return new EditorState(
      { ...this._editorState, ...newState },
      this.undoStack.concat(this),
      []
    );
  }

  rotateImage(rotation) {
    return this.applyNewState({ rotation: this.rotation + rotation });
  }

  cropImage(crop, autoScale = false) {
    const currentCrop = this.crop;
    const { left, top, width, height } = currentCrop;
    const fWidth = parseFloat(width);
    const fHeight = parseFloat(height);
    const newWidth = (fWidth * parseFloat(crop.width)) / 100;
    const newHeight = (fHeight * parseFloat(crop.height)) / 100;
    const newCrop = {
      top: `${parseFloat(top) + (parseFloat(crop.top) * fHeight) / 100}%`,
      left: `${parseFloat(left) + (parseFloat(crop.left) * fWidth) / 100}%`,
      width: `${newWidth}%`,
      height: `${newHeight}%`
    };

    let scale = this.scale;

    if (autoScale) {
      scale = Math.min(1 / (newHeight / 100), 1 / (newWidth / 100));
    }

    return this.applyNewState({ crop: newCrop, scale });
  }

  setSaturation(saturation) {
    return this.applyNewState({ saturation });
  }

  scaleImage(scale) {
    return this.applyNewState({ scale });
  }

  flipHorizontal() {
    const { horizontal, vertical } = this.flip;
    return this.applyNewState({ flip: { horizontal: !horizontal, vertical } });
  }

  flipVertical() {
    const { horizontal, vertical } = this.flip;
    return this.applyNewState({ flip: { vertical: !vertical, horizontal } });
  }

  toggleGrayscale() {
    const { grayscale } = this.effects;
    return this.applyNewState({
      effects: { ...this.effects, grayscale: !grayscale }
    });
  }
}

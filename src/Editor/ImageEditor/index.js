import React, { Component } from "react";
import ImageEditor from "./Editor";
import EditorState from "./EditorState";

export default class EditorView extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  rotateLeft = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: editorState.rotateImage(-90)
    });
  };

  rotateRight = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: editorState.rotateImage(90)
    });
  };

  flipHorizontal = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: editorState.flipHorizontal()
    });
  };

  flipVertical = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: editorState.flipVertical()
    });
  };

  onCrop = crop => {
    this.setState({
      crop
    });
  };

  onImageLoaded = img => {
    this._img = img;
  };

  applyCrop = () => {
    const { editorState, crop } = this.state;

    this.setState({
      cropping: false,
      crop: null,
      editorState: editorState.cropImage(crop, true)
    });
  };

  toggleCrop = () => {
    this.setState({
      cropping: !this.state.cropping
    });
  };

  toggleGrayscale = () => {
    const { editorState } = this.state;
    this.setState({
      editorState: editorState.toggleGrayscale()
    });
  };

  undo = () => {
    this.setState({
      editorState: this.state.editorState.undo()
    });
  };

  redo = () => {
    this.setState({
      editorState: this.state.editorState.redo()
    });
  };

  updateSaturation = ({ target: { value = "0" } }) => {
    this.setState({
      editorState: this.state.editorState.setSaturation(parseInt(value, 10))
    });
  };

  render() {
    const { src } = this.props;
    const styles = {
      container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      },
      list: {
        listStyleType: "none"
      },
      listItem: {
        display: "inline-block"
      },
      button: {
        borderRadius: 0,
        color: "white",
        backgroundColor: "black",
        padding: "5px 10px",
        borderStyle: "solid",
        borderColor: "#CCC",
        borderLeftWidth: 0
      }
    };
    const { editorState, cropping } = this.state;
    const config = {
      showCropTool: cropping
    };
    return (
      <div style={styles.container}>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.undo}
            >
              Undo
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.redo}
            >
              Redo
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.rotateLeft}
            >
              Rotate Left
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.rotateRight}
            >
              Rotate Right
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.flipHorizontal}
            >
              Flip Hori
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.flipVertical}
            >
              Flip Vert
            </button>
          </li>
          <li style={styles.listItem}>
            <button
              style={styles.button}
              disabled={cropping}
              onClick={this.toggleGrayscale}
            >
              B&W
            </button>
          </li>
          <li style={styles.listItem}>
            <button style={styles.button} onClick={this.toggleCrop}>
              Crop
            </button>
          </li>
          {cropping && (
            <li style={styles.listItem}>
              <button
                style={{ ...styles.button, color: "#00ff00" }}
                onClick={this.applyCrop}
              >
                Done
              </button>
            </li>
          )}
        </ul>
        <ImageEditor
          src={src}
          config={config}
          editorState={editorState}
          onCrop={this.onCrop}
          onImageLoaded={this.onImageLoaded}
          width={900}
          height={600}
        />
        <div style={{ marginTop: 20 }}>
          <label>
            Saturation:{" "}
            <input
              type="range"
              min="-100"
              max="100"
              value={editorState.saturation}
              onChange={this.updateSaturation}
            />
          </label>
        </div>
      </div>
    );
  }
}

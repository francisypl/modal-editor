import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import EditorState from "./EditorState";
import CropTool from "./CropTool";
import { grayscale, saturate } from "./utils";

export default class ImageEditor extends PureComponent {
  static propTypes = {
    src: PropTypes.string.isRequired,
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onImageLoaded: PropTypes.func,
    onCrop: PropTypes.func,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    cropStyle: PropTypes.string,
    config: PropTypes.shape({
      showCropTool: PropTypes.bool,
      showFocalSelector: PropTypes.bool,
      output: PropTypes.shape({
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        maxHeight: PropTypes.number
      })
    })
  };

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = { img: null };
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext("2d");
  }

  componentDidUpdate() {
    this.renderImage();
  }

  renderImage() {
    const { editorState, width, height } = this.props;
    const {
      rotation,
      crop = { top: "0%", left: "0%", width: "100%", height: "100%" },
      scale = 1,
      flip,
      effects,
      saturation = 0
    } = editorState;
    const { ctx } = this;
    const { img } = this.state;
    if (!img) {
      return;
    }
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    const { top, left, width: cropWidth, height: cropHeight } = crop;
    const imgX = (parseFloat(left) / 100) * img.width;
    const imgY = (parseFloat(top) / 100) * img.height;
    this._imgWidth = (parseFloat(cropWidth) / 100) * img.width;
    this._imgHeight = (parseFloat(cropHeight) / 100) * img.height;
    ctx.translate(flip.horizontal ? width : 0, flip.vertical ? height : 0);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(width / 2, height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-width / 2, -height / 2);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    const canvasWidth = this._imgWidth * scale;
    const canvasHeight = this._imgHeight * scale;
    const canvasX = width / 2 - canvasWidth / 2;
    const canvasY = height / 2 - canvasHeight / 2;
    ctx.drawImage(
      img,
      imgX,
      imgY,
      this._imgWidth,
      this._imgHeight,
      canvasX,
      canvasY,
      canvasWidth,
      canvasHeight
    );
    if (effects.grayscale) {
      const imageData = ctx.getImageData(
        canvasX,
        canvasY,
        canvasWidth,
        canvasHeight
      );
      grayscale(imageData.data);
      ctx.putImageData(imageData, canvasX, canvasY);
    }
    if (saturation !== 0) {
      const imageData = ctx.getImageData(
        canvasX,
        canvasY,
        canvasWidth,
        canvasHeight
      );
      saturate(imageData.data, saturation);
      ctx.putImageData(imageData, canvasX, canvasY);
    }
    ctx.restore();
  }

  onImageLoaded = event => {
    const { onImageLoaded } = this.props;
    const img = event.target;
    this.setState({ img });
    onImageLoaded && onImageLoaded(img);
    this.renderImage();
  };

  render() {
    const {
      src,
      config,
      onCrop,
      editorState,
      width,
      height,
      cropStyle
    } = this.props;
    const { scale } = editorState;
    const { img } = this.state;
    const { showCropTool } = config;

    return (
      <div style={{ width, height, position: "relative" }}>
        {showCropTool && img && (
          <CropTool
            onChange={onCrop}
            cropStyle={cropStyle}
            width={this._imgWidth * scale || img.width}
            height={this._imgHeight * scale || img.height}
          />
        )}
        <canvas
          width={width}
          height={height}
          ref={this.canvas}
          draggable={false}
        />
        <img
          crossOrigin="Anonymous"
          src={src}
          style={{ display: "none" }}
          onLoad={this.onImageLoaded}
          alt=""
        />
      </div>
    );
  }
}

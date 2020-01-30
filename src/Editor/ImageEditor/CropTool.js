import React, { Component } from "react";
import PropTypes from "prop-types";

import * as cropStyles from "../../constants/cropStyles";

const DEFAULT_CROP = {
  top: "10%",
  left: "10%",
  right: "10%",
  bottom: "10%"
};

const VERTICAL_ASPECT_RATIO = {
  width: 9,
  height: 16
};

const HORIZONTAL_ASPECT_RATIO = {
  width: 16,
  height: 9
};

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function haltEvent(event) {
  event.stopPropagation();
  event.preventDefault();
}

function getSquareCrop(width, height) {
  let size = [];
  if (width > height) {
    const space = (width - height) / 2;
    const percent = space / width;
    size = [0, percent, 0, percent];
  } else if (height > width) {
    const space = (height - width) / 2;
    const percent = space / height;
    size = [percent, 0, percent, 0];
  } else {
    size = [0, 0, 0, 0];
  }
  return size;
}

function cropHeightWithAspectRatio(width, height, aspectRatio) {
  const newHeight = (aspectRatio.height * width) / aspectRatio.width;
  const space = (height - newHeight) / 2;
  const percent = space / height;
  return [percent, 0, percent, 0];
}

function cropWidthWithAspectRaio(width, height, aspectRatio) {
  const newWidth = (aspectRatio.width * height) / aspectRatio.height;
  const space = (width - newWidth) / 2;
  const percent = space / width;
  return [0, percent, 0, percent];
}

function getHorizontalCrop(width, height) {
  let size = [0, 0, 0, 0];
  if (height > width) {
    size = cropHeightWithAspectRatio(width, height, HORIZONTAL_ASPECT_RATIO);
    if (size.some(size => size < 0)) {
      size = cropWidthWithAspectRaio(width, height, HORIZONTAL_ASPECT_RATIO);
    }
  } else if (width > height) {
    size = cropWidthWithAspectRaio(width, height, HORIZONTAL_ASPECT_RATIO);
    if (size.some(size => size < 0)) {
      size = cropHeightWithAspectRatio(width, height, HORIZONTAL_ASPECT_RATIO);
    }
  }
  return size;
}

function getVerticalCrop(width, height) {
  let size = [0, 0, 0, 0];
  if (width > height) {
    size = cropWidthWithAspectRaio(width, height, VERTICAL_ASPECT_RATIO);
    if (size.some(size => size < 0)) {
      size = cropHeightWithAspectRatio(width, height, VERTICAL_ASPECT_RATIO);
    }
  } else if (height > width) {
    size = cropHeightWithAspectRatio(width, height, VERTICAL_ASPECT_RATIO);
    if (size.some(size => size < 0)) {
      size = cropWidthWithAspectRaio(width, height, VERTICAL_ASPECT_RATIO);
    }
  }
  return size;
}

export default class CropTool extends Component {
  static get propTypes() {
    return {
      cropStyle: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    };
  }

  constructor() {
    super(...arguments);
    const { width, height, cropStyle } = this.props;
    let size = [];
    const sizeMap = ["top", "right", "bottom", "left"];
    if (cropStyle === cropStyles.square) {
      size = getSquareCrop(width, height);
    } else if (cropStyle === cropStyles.horizontal) {
      size = getHorizontalCrop(width, height);
    } else if (cropStyle === cropStyles.vertical) {
      size = getVerticalCrop(width, height);
    } else if (cropStyle === cropStyles.freeform) {
      size = [0, 0, 0, 0];
    }
    this.state =
      size && size.length
        ? size.reduce((final, value, index) => {
            final[sizeMap[index]] = `${value * 100}%`;
            return final;
          }, {})
        : DEFAULT_CROP;
    this.container = React.createRef();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  componentDidMount() {
    this.handleChange();
  }

  handleChange() {
    const { top, left, bottom, right } = this.state;
    const { onChange } = this.props;
    this._grabber = "";
    this._moving = false;
    const width = `${(100 - (parseFloat(left) + parseFloat(right))).toFixed(
      2
    )}%`;
    const height = `${(100 - (parseFloat(top) + parseFloat(bottom))).toFixed(
      2
    )}%`;
    onChange({ top, left, width, height });
  }

  onTopMouseDown = event => {
    this._grabber = "top";
    this.addEventListeners();
    haltEvent(event);
  };

  onLeftMouseDown = event => {
    this._grabber = "left";
    this.addEventListeners();
    haltEvent(event);
  };

  onRightMouseDown = event => {
    this._grabber = "right";
    this.addEventListeners();
    haltEvent(event);
  };

  onBottomMouseDown = event => {
    this._grabber = "bottom";
    this.addEventListeners();
    haltEvent(event);
  };

  onMoveMouseDown = event => {
    this._moving = true;
    const { clientX, clientY } = event;
    this._lastPos = { clientX, clientY };
    this.addEventListeners();
  };

  onMouseMove = event => {
    const { clientX, clientY } = event;
    const containerRect = this.container.current.getBoundingClientRect();
    let { top, left, bottom, right } = this.state;

    if (this._moving) {
      const diffX =
        (100 * (clientX - this._lastPos.clientX)) / containerRect.width;
      const diffY =
        (100 * (clientY - this._lastPos.clientY)) / containerRect.height;
      top = `${minMax((parseFloat(top) + diffY).toFixed(2), 0, 100)}%`;
      bottom = `${minMax((parseFloat(bottom) - diffY).toFixed(2), 0, 100)}%`;
      left = `${minMax((parseFloat(left) + diffX).toFixed(2), 0, 100)}%`;
      right = `${minMax((parseFloat(right) - diffX).toFixed(2), 0, 100)}%`;
      this._lastPos = { clientX, clientY };
    } else {
      switch (this._grabber) {
        case "top":
          const newTop =
            (100 * (clientY - containerRect.top)) / containerRect.height;
          if (newTop > 0 && newTop < 100 - parseInt(bottom, 10)) {
            top = `${newTop.toFixed(2)}%`;
          }
          break;
        case "left":
          const newLeft =
            (100 * (clientX - containerRect.left)) / containerRect.width;
          if (newLeft > 0 && newLeft < 100 - parseInt(right, 10)) {
            left = `${newLeft.toFixed(2)}%`;
          }
          break;
        case "right":
          const newRight =
            (100 * (containerRect.right - clientX)) / containerRect.width;
          if (newRight > 0 && newRight < 100 - parseInt(left, 10)) {
            right = `${newRight.toFixed(2)}%`;
          }
          break;
        case "bottom":
          const newBottom =
            (100 * (containerRect.bottom - clientY)) / containerRect.height;
          if (newBottom > 0 && newBottom < 100 - parseInt(top, 10)) {
            bottom = `${newBottom.toFixed(2)}%`;
          }
          break;
        default:
          break;
      }
    }

    this.setState({ top, left, bottom, right });
  };

  onMouseUp = () => {
    this.handleChange();
    this.removeEventListeners();
  };

  addEventListeners() {
    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mouseup", this.onMouseUp, false);
  }

  removeEventListeners() {
    window.removeEventListener("mousemove", this.onMouseMove, false);
    window.removeEventListener("mouseup", this.onMouseUp, false);
  }

  render() {
    const { width, height, cropStyle } = this.props;
    const { top, left, bottom, right } = this.state;
    const grabberCommon = {
      width: 10,
      height: 10,
      borderRadius: "50%",
      border: "1px solid black",
      backgroundColor: "white"
    };
    const maskCommon = {
      position: "absolute",
      backgroundColor: "rgba(0, 0, 0, 0.5)"
    };
    const styles = {
      container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width,
        height,
        transform: "translate(-50%,-50%)",
        cursor: this._grabber ? "grabbing" : "default"
      },
      cropper: {
        position: "absolute",
        left,
        top,
        bottom,
        right,
        border: "1px solid black",
        cursor: this._grabber ? "grabbing" : "move",
        zIndex: 1
      },
      grabberTop: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, -50%)",
        cursor: this._grabber === "top" ? "grabbing" : "grab",
        ...grabberCommon
      },
      grabberLeft: {
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translate(-50%, -50%)",
        cursor: this._grabber === "left" ? "grabbing" : "grab",
        ...grabberCommon
      },
      grabberBottom: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translate(-50%, 50%)",
        cursor: this._grabber === "bottom" ? "grabbing" : "grab",
        ...grabberCommon
      },
      grabberRight: {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translate(50%, -50%)",
        cursor: this._grabber === "right" ? "grabbing" : "grab",
        ...grabberCommon
      },
      maskLeft: {
        left: 0,
        top,
        width: left,
        bottom,
        ...maskCommon
      },
      maskTop: {
        top: 0,
        height: top,
        width: "100%",
        left: 0,
        ...maskCommon
      },
      maskRight: {
        right: 0,
        top,
        width: right,
        bottom,
        ...maskCommon
      },
      maskBottom: {
        bottom: 0,
        height: bottom,
        width: "100%",
        left: 0,
        ...maskCommon
      }
    };

    return (
      <div style={styles.container} ref={this.container}>
        <div style={styles.cropper} onMouseDown={this.onMoveMouseDown}>
          <div
            onMouseDown={this.onTopMouseDown}
            style={styles.grabberTop}
            draggable={false}
          />
          <div
            onMouseDown={this.onRightMouseDown}
            style={styles.grabberRight}
            draggable={false}
          />
          <div
            onMouseDown={this.onBottomMouseDown}
            style={styles.grabberBottom}
            draggable={false}
          />
          <div
            onMouseDown={this.onLeftMouseDown}
            style={styles.grabberLeft}
            draggable={false}
          />
        </div>
        <div style={styles.maskLeft} />
        <div style={styles.maskRight} />
        <div style={styles.maskTop} />
        <div style={styles.maskBottom} />
      </div>
    );
  }
}

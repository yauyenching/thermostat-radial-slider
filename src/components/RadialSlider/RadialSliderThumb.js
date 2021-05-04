import React, { useEffect, useState } from 'react';
import './RadialSliderThumb.css';
import { ReactComponent as Thumb } from 'assets/SliderThumb.min.svg';
import { getAngle, getX, getY } from 'utils/AngleOffset.js';

const RadialSliderThumb = (props) => {
  const RADIUS = (492 - (8 + 53.34 / 2) * 2) / 2;;
  const cx = props.cx;
  const cy = props.cy;
  const temp = 72.0;

  const [dragging, setDragging] = useState(false);
  const [coord, setCoord] = useState({ x: 0, y: 0 })

  // Get index of radial slider thumb based on current temperature for helper function input
  const tempToIndex = (temp) => {
    return ((temp - 50) * 2);
  }

  const initIndex = tempToIndex(temp);
  const [index, setIndex] = useState(initIndex);

  // Convert angle in radians to degrees
  const convertToDeg = (rad) => {
    return rad * (180 / Math.PI);
  }

  const findAngleFromCenter = () => {
    return convertToDeg(Math.atan2(coord.x - cx, -(coord.y - cy)));
  }

  const outOfBoundsIndex = (i) => {
    return (i >= 60) ? 60 : ((i <= 0) ? 0 : i);
  }

  const findIndexFromAngle = (angle) => {
    // Angle of all graduation marks is 300 deg in total split between 61 marks
    const DEG = 300 / 60;
    // Starting mark index 0 is at -150 deg
    const BASE = -150;
    // Calculate index based on index 0
    const index = Math.round((angle - BASE) / DEG);

    return outOfBoundsIndex(index);
  }

  /** ----------------------------------------------------------------
   *  Event listeners
   */
  const onMouseDown = (e) => {
    setDragging(true);
    console.log("STARTED tracking mouse movement");
  }

  const onMouseUp = (e) => {
    if (dragging) {
      setDragging(false);
      console.log("STOPPED tracking mouse movement: mouse up");
    }
  }

  const onMouseMove = (e) => {
    if (dragging) {
      setCoord({
        x: e.pageX,
        y: e.pageY
      });
      const angle = findAngleFromCenter();
      const newIndex = findIndexFromAngle(angle);
      // console.log("index: " + newIndex);
      setIndex(newIndex);
      props.handleChangeTargetTemp(index);
    }
  }

  // Referenced https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
  const onScroll = (e) => {
    e.preventDefault();
    const forward = (e.deltaY < 0) ? true : false;
    if (forward) {
      setIndex(outOfBoundsIndex(index + 1));
    } else {
      setIndex(outOfBoundsIndex(index - 1));
    }
    props.handleChangeTargetTemp(index);
  }

  /** ----------------------------------------------------------------
   *  Add custom event listeners to document
   */

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("wheel", onScroll);
    
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("wheel", onScroll);
    }
  })

  const xOffset = getX(index, RADIUS);
  const yOffset = getY(index, RADIUS);
  const rotationDeg = getAngle(index);
  const style = {
    transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotationDeg}deg)`
  };

  return (
    <Thumb
      className="RadialSliderThumb"
      style={style}
      onMouseDown={onMouseDown}
    />
  );
}

export default RadialSliderThumb;

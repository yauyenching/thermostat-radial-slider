import React, { Component, useEffect, useState } from 'react';
import './RadialSliderThumb.css';
import { ReactComponent as Thumb } from '../assets/Thumb.min.svg';
import { getAngle, getX, getY } from '../utils/AngleOffset.js';

function RadialSliderThumb(props) {
  // 517 is the diameter of the circle including the thumb
  // 43 is the height of the thumb
  const RADIUS = (517 - (43 / 2) * 2) / 2;
  const cx = props.cx;
  const cy = props.cy;
  // console.log("cx: " + cx + ", cy: " + cy);
  // const [temp, setTemp] = useState(72.0);
  const temp = 72.0;

  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: null, y: null })
  const [coord, setCoord] = useState({ x: null, y: null })
  const [distCenter, setDistCenter] = useState(0);

  // Get index of radial slider thumb based on current temperature for helper function input
  function getIndex(temp) {
    return ((temp - 50) * 2);
  }

  const initIndex = getIndex(temp);
  const [index, setIndex] = useState(initIndex);
  const [lastNumPoints, setLast] = useState(null);
  // console.log("initial index: " + getIndex(temp));

  // Calculate chord distance between points
  function getDistanceFromOrigin() {
    const xs = coord.x - origin.x
    const ys = coord.y - origin.y
    return (coord.x == null ? 0 : Math.hypot(xs, ys));
    // return { dist: Math.hypot(xs, ys), forward: (coord.x >= origin.x) ? true : false };
  }

  // Calculate distance from center
  function getDistanceFromCenter(e) {
    const xs = e.pageX - cx
    const ys = e.pageY - cy
    return Math.hypot(xs, ys);
  }
  
  // Convert angle in radians to degrees
  function convertToDeg(rad) {
    return rad * (180 / Math.PI);
  }

  // Find angle in deg based on chord distance
  function findAngle(distance) {
    return convertToDeg(Math.asin(distance / (2 * RADIUS)) * 2);
  }

  function findAngleFromCenter() {
    return Math.atan2(coord.x - cx, -(coord.y - cy)) * 180 / Math.PI;
  }

  /** ----------------------------------------------------------------
   *  Event listeners
   */
  function onMouseDown(e) {
    setOrigin({
      x: e.pageX,
      y: e.pageY
    });
    setDragging(true);
    console.log("STARTED tracking mouse movement");
    console.log("ox: " + origin.x + ", oy: " + origin.y);
    console.log("origin index: " + index);
  }

  function onMouseUp(e) {
    if (dragging) {
      setDragging(false);
      console.log("STOPPED tracking mouse movement: mouse up");
    }
  }
  
  /* function onMouseOut(e) {
    setDragging(false);
    console.log("STOPPED tracking mouse movement: mouse out");
  } */

  function onMouseMove(e) {
    if (dragging) {
      // const distCenter = getDistanceFromCenter(e);
      setDistCenter(getDistanceFromCenter(e));
      // console.log(distCenter)
      if (distCenter < 492 / 2 - 30 || distCenter > 492 / 2 + 13) {
        setDragging(false);
        console.log("STOPPED tracking mouse movement: mouse left interactive area");
        return;
      } else {
        setCoord({
          x: e.pageX,
          y: e.pageY
        });
        console.log("cx: " + coord.x + ", cy: " + coord.y);
        // const { dist, forward } = getDistanceFromOrigin();
        const dist = getDistanceFromOrigin();
        console.log(findAngleFromCenter());
        // console.log("dist: " + dist + ", forward: " + forward);
        // console.log("dist: " + dist);
        // find index based on distance
        const numPoints = Math.floor(findAngle(dist) / 5);
        // const [lastNumPoints, setLast] = setState
        let indexOffset = 0;
        // let forward;
        // let lastNumPoints = null;
        // console.log("numPoints: " + numPoints + ", lastNumPoints: " + lastNumPoints + ", indexOffset: " + indexOffset);
        if (lastNumPoints == null) {
          setLast(numPoints);
          // forward = (coord.x >= origin.x) ? true : false }
        } else if (lastNumPoints < numPoints) {
          indexOffset = 1;
          setLast(numPoints);
          // forward = true;
        } else if (lastNumPoints > numPoints) {
          indexOffset = -1;
          setLast(numPoints);
          // forward = false;
        } else {
          indexOffset = 0;
        };
        if (!isNaN(numPoints)) {
          // setIndex((forward) ? index + numPoints : index - numPoints);
          setIndex(index + indexOffset);
        }
        // console.log("index: " + index);
      }
    }
  }

  /** ----------------------------------------------------------------
   *  Add custom event listeners to document
   */

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
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
    // onClick={e => alert(e.target.getBoundingClientRect().left + ', ' + e.target.getBoundingClientRect().top)}
      // style={style}
      // onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      // onMouseOut={onMouseOut}
      // onMouseMove={onMouseMove}
    />
  );
}

export default RadialSliderThumb;

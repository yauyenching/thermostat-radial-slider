import React, { Component } from 'react';
import './RadialSliderThumb.css';
import { ReactComponent as Thumb } from '../assets/Thumb.min.svg';

function RadialSliderThumb() {
  // 517 is the diameter of the circle including the thumb
  // 43 is the height of the thumb
  const RADIUS = (517 - (43 / 2) * 2) / 2;

  // Convert deg to radian as in-built Math trig functions use radians
  function convertToRad(deg) {
    return deg * (Math.PI / 180);
  }

  // Get the rotation angle in degrees based on an index i to know how much to rotate each graduation mark on the thermostat face
  function getAngle(i) {
    // Angle of all marks is 300 deg in total split between 61 marks
    const DEG = 300 / 60;
    // Starting mark index 0 is at -150 deg
    const BASE = -150;

    return i * DEG + BASE;
  }

  // Get X offset of thumb given index i
  function getX(i) {
    return Math.sin(convertToRad(getAngle(i))) * RADIUS;
  }

  // Get X offset of thumb given index i
  function getY(i) {
    return RADIUS - (Math.cos(convertToRad(getAngle(i))) * RADIUS);
  }

  /*   // Create and position graduation mark given index i
    function createMark(i) {
      const xOffset = getX(i);
      const yOffset = getY(i);
      const rotationDeg = getAngle(i);
      //translate(${xOffset}px, ${yOffset}px) 
      const style = {
        transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotationDeg}deg)`
      };
      // console.log(style);
      return <Thumb className="RadialSliderThumb" key={i} style={style} />;
    }
  
    // Create track for all indexes
    function createTrack() {
      let track = [];
  
      for (let i = 0; i < 61; i++) {
        track.push(createMark(i));
      }
  
      return track;
    } */

  return <Thumb className="RadialSliderThumb" />;
}

export default RadialSliderThumb;

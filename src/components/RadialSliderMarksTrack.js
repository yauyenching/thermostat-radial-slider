import { getByPlaceholderText } from '@testing-library/dom'
import React, { Component } from 'react'
import { ReactComponent as SliderMark } from '../assets/SliderMark.min.svg'

function RadialSliderMarksTrack() {
    /**
     * Auxiliary functions to assist in calculating where to place graduation marks along the inner face from -150 deg to 150 deg.
     */
    // Radius of circle of which marks will be drawn along the inner boundary
    const RADIUS = (492 - (8 + 53.34/2) * 2)/2;
    // Width of ellipse
    const WIDTH_OFFSET = 5.08;
    // Height of ellipse
    const HEIGHT_OFFSET = 53.34;

    // Convert deg to radian as in-built Math trig functions use radians
    function convertToRad(deg) {
        return deg * (Math.PI / 180);
    }

    // Get the rotation angle in degrees based on an index i to know how much to rotate each graduation mark on the thermostat face
    function getAngle(i) {
        // Angle of all marks is 300 deg in total split between 61 marks
        const DEG = 300/60;
        // Starting mark index 0 is at -150 deg
        const BASE = -150;

        return i * DEG + BASE;
    }

    // Get the hypotenuse using the chord length formula to calculate X and Y offset given index i
    function getChord(i) {
        return 2 * RADIUS * Math.sin(convertToRad(getAngle(i))/2);
    }

    // Get X offset of mark given index i
    function getX(i) {
        return Math.sin(convertToRad(getAngle(i))) * RADIUS;
    }

    // Get X offset of mark given index i
    function getY(i) {
        return RADIUS - (Math.cos(convertToRad(getAngle(i))) * RADIUS);
    }

    /**
     * Create graduation mark track
     */
    // Create and position graduation mark given index i
    function createMark(i) {
        const xOffset = getX(i);
        const yOffset = getY(i);
        const rotationDeg = getAngle(i);
        //translate(${xOffset}px, ${yOffset}px) 
        const style = {
            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotationDeg}deg)`
        };
        // console.log(style);
        return <SliderMark className="SliderMark" key={i} style={style}/>;
    }

    // Create track for all indexes
    function createTrack() {
        let track = [];

        for (let i = 0; i < 61; i++) {
            track.push(createMark(i));
        }

        return track;
    }

    return createTrack();
}

export default RadialSliderMarksTrack;

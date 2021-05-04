import React from 'react'
import { ReactComponent as SliderMark } from 'assets/SliderMark.min.svg'
import './RadialSliderMarksTrack.css';
import { getAngle, getX, getY } from 'utils/AngleOffset.js';

/**
 * Auxiliary functions to assist in calculating where to place graduation marks along the inner face from -150 deg to 150 deg.
 */
const RadialSliderMarksTrack = () => {
    // Radius of circle of which marks will be drawn along the inner boundary
    // 492 is the diameter of the inner face
    // 8 is the distance of the slider mark from the edge of the inner face
    // 53.34 is the height of the slider mark
    const RADIUS = (492 - (8 + 53.34 / 2) * 2) / 2;

    /**
     * Create graduation mark track
     */
    // Create and position graduation mark given index i
    const createMark = (i) => {
        const xOffset = getX(i, RADIUS);
        const yOffset = getY(i, RADIUS);
        const rotationDeg = getAngle(i);
        //translate(${xOffset}px, ${yOffset}px) 
        const style = {
            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotationDeg}deg)`
        };
        // console.log(style);
        return (
            <SliderMark
                className="SliderMark"
                key={i}
                style={style}
                // onClick={e => alert(e.pageX + ', ' + e.pageY)}
            />
        );
    }

    // Create track for all indexes
    const createTrack = () => {
        let track = [];

        for (let i = 0; i < 61; i++) {
            track.push(createMark(i));
        }

        return track;
    }

    return createTrack();
}

export default RadialSliderMarksTrack;

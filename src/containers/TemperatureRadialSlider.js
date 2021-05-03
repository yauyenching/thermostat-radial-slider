import React, { Component, useState } from 'react'
import './TemperatureRadialSlider.css'
import { ReactComponent as BGFace } from '../assets/ThermostatBG.min.svg';
import { ReactComponent as InnerFace } from '../assets/InnerFace.min.svg';
import { ReactComponent as SunIcon } from '../assets/Sun.min.svg';
// import { ReactComponent as RadialSliderThumb } from '../assets/Thumb.min.svg';
import RadialSliderThumb from '../components/RadialSliderThumb';
// import { ReactComponent as SliderMark } from '../assets/SliderMark.min.svg';
import RadialSliderMarksTrack from '../components/RadialSliderMarksTrack';
import TemperatureGauges from '../components/TemperatureGauges';
import CurrentTemperatureSlider from '../components/CurrentTemperatureSlider'

function TemperatureRadialSlider() {
  const [currTemp, setCurrTemp] = useState(72);
  const [targetTemp, setTargetTemp] = useState(72);
  const [targetTempDecimal, setTargetTempDecimal] = useState(0);

  function handleChangeCurrTemp(value) {
    if (value >= 32 && value <= 100) {
      setCurrTemp(value);
    }
  }

  function handleChangeTargetTemp(value) {
    if (value >= 50 && value <= 80) {
      setTargetTemp(value);
    }
  }

  return (
    <div className="TemperatureRadialSlider">
      <div className="Face">
        {/* <SliderMark className="SliderMark"/> */}
        <RadialSliderMarksTrack className="RadialSliderMarksTrack" />
        <BGFace className="BGFace" />
        <InnerFace className="InnerFace" />
        <SunIcon className="SunIcon" />
        <TemperatureGauges
          currTemp={currTemp}
          targetTemp={targetTemp}
          targetTempDecimal={targetTempDecimal}
        />
        <RadialSliderThumb />
      </div>
      <CurrentTemperatureSlider
        currTemp={currTemp}
        handleChangeCurrTemp={handleChangeCurrTemp}
      />
    </div>
  )
}

export default TemperatureRadialSlider;
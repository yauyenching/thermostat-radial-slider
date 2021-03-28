import React, { Component } from 'react'
import { ReactComponent as BGFace } from './assets/ThermostatBG.min.svg';
import { ReactComponent as InnerFace } from './assets/InnerFace.min.svg';
import { ReactComponent as SunIcon } from './assets/Sun.min.svg';
import { ReactComponent as Pointer } from './assets/Pointer.min.svg';
// import { ReactComponent as SliderMark } from './assets/SliderMark.min.svg';
import RadialSliderMarksTrack from './components/RadialSliderMarksTrack';
import './App.css';

function App() {
  return (
    <div className="Face">
      {/* <SliderMark className="SliderMark"/> */}
      <RadialSliderMarksTrack className="RadialSliderMarksTrack"/>
      <BGFace className="BGFace"/>
      <InnerFace className="InnerFace"/>
      <SunIcon className="SunIcon"/>
      <div className="TemperatureGauges">
        <div className="TargetTemperature">72</div>
        <div className="TargetTemperature" style={{fontSize: 72}}>.0</div>
        <div className="CurrentTemperature">Current: 72</div>
      </div>
      <Pointer className="Pointer"/>
    </div>
  );
}

export default App;

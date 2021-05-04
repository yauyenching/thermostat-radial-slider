import React from 'react';
import './Thermostat.css';
import { ReactComponent as BGFace } from 'assets/ThermostatBG.min.svg';
// import { ReactComponent as InnerFace } from 'assets/InnerFace.min.svg';
// import { ReactComponent as ColdFace } from 'assets/CoolingFace.min.svg';
// import { ReactComponent as HotFace } from 'assets/HeatingFace.min.svg';
import { ReactComponent as SunIcon } from 'assets/Sun.min.svg';
import ThermostatFace from 'components/Face/ThermostatFace';
import RadialSliderThumb from 'components/RadialSlider/RadialSliderThumb';
import RadialSliderMarksTrack from 'components/RadialSlider/RadialSliderMarksTrack';
import TemperatureGauges from 'components/Face/TemperatureGauges';
import CurrentTemperatureSlider from 'components/CurrentTemperatureSlider'
import ThermostatModel from 'hooks/ThermostatModel';

function Thermostat() {

  // From https://stackoverflow.com/questions/56512018/finding-the-center-point-coordinates-of-svg
  /* function getCenter(svgElement) {
    let { x, y, width, height } = svgElement.getBoundingClientRect();
    let cx = width / 2 + x;
    let cy = height / 2 + y;
    return { cx: cx, cy: cy }
  } */

  const { mode, currTemp, targetTemp, targetTempDecimal, handleChangeCurrTemp, handleChangeTargetTemp } = ThermostatModel();

  return (
    <div className="TemperatureRadialSlider">
      <div id="Thermostat">
        <BGFace className="Face" />
        {/* <InnerFace className="Face" /> */}
        <ThermostatFace 
          mode={mode}
        />
        <SunIcon className="SunIcon" />
        <TemperatureGauges
          currTemp={currTemp}
          targetTemp={targetTemp}
          targetTempDecimal={targetTempDecimal}
        />
        <RadialSliderMarksTrack className="RadialSliderMarksTrack" />
        <RadialSliderThumb 
          cx={300}
          cy={300}
          handleChangeTargetTemp={handleChangeTargetTemp}
        />
      </div>
      <CurrentTemperatureSlider
        currTemp={currTemp}
        handleChangeCurrTemp={handleChangeCurrTemp}
      />
    </div>
  )
}

export default Thermostat;
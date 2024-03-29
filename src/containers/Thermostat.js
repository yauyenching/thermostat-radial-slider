import React from 'react';
import './Thermostat.css';
import { ReactComponent as BGFace } from 'assets/ThermostatBG.min.svg';
import { ReactComponent as SunIcon } from 'assets/Sun.min.svg';
import ThermostatFace from 'components/Face/ThermostatFace';
import RadialSliderThumb from 'components/RadialSlider/RadialSliderThumb';
import RadialSliderMarksTrack from 'components/RadialSlider/RadialSliderMarksTrack';
import TemperatureGauges from 'components/Face/TemperatureGauges';
import CurrentTemperatureSlider from 'components/CurrentTemperatureSlider'
import ThermostatModel from 'hooks/ThermostatModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Absolute file path referenced from https://dev.to/mr_frontend/absolute-imports-in-create-react-app-3ge8

const Thermostat = () => {
  const { mode, currTemp, targetTemp, targetTempDecimal, handleChangeCurrTemp, handleChangeTargetTemp } = ThermostatModel();

  // Code to find center of page from https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
  const cx = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) / 2
  const cy = 30 + 600 / 2;

  return (
    <div className="TemperatureRadialSlider">
      <div id="Thermostat">
        <BGFace className="Face" />
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
          cx={cx}
          cy={cy}
          handleChangeTargetTemp={handleChangeTargetTemp}
        />
      </div>
      <CurrentTemperatureSlider
        currTemp={currTemp}
        handleChangeCurrTemp={handleChangeCurrTemp}
      />
      <div align="center">
        <h3>Built with ❤️ by Yau Yen Ching&nbsp;
        <a href="https://github.com/yauyenching"><FontAwesomeIcon icon={faGithub}  color="black"/></a> 
        <a href="https://www.linkedin.com/in/yau-yen-ching"><FontAwesomeIcon icon={faLinkedin} color="black"/></a> 
        </h3>
      </div>
    </div>
  )
}

export default Thermostat;
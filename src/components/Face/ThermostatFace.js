import React, { useState } from 'react';
import './ThermostatFace.css';
import { ReactComponent as InnerFace } from 'assets/InnerFace.min.svg';
import { ReactComponent as ColdFace } from 'assets/CoolingFace.min.svg';
import { ReactComponent as HotFace } from 'assets/HeatingFace.min.svg';

/**
 * Change color of thermostat face based on mode
 * @param {*} mode mode of the thermostat based on current and target temperatures
 */
const ThermostatFace = (props) => {
  const mode = props.mode;
  console.log('ThermostatFace mode: ' + mode);
  // const [heatMode, setHeatMode] = useState('off');
  // const [coolMode, setCoolMode] = useState('off');
  let heatMode = 'off';
  let coolMode = 'off';

  const updateModes = () => {
    switch (mode) {
      case 'off':
        heatMode = 'off';
        coolMode = 'off';
        console.log('heatMode: ' + heatMode + ', coolMode: ' + coolMode);
        break;
      case 'cooling':
        coolMode = 'on';
        console.log('heatMode: ' + heatMode + ', coolMode: ' + coolMode);
        break;
      case 'heating':
        heatMode = 'on';
        console.log('heatMode: ' + heatMode + ', coolMode: ' + coolMode);
        break;
    }
  }

  updateModes();

  return (
    <>
      <InnerFace className="Face" />
      <ColdFace className={`Face ${coolMode}`} />
      <HotFace className={`Face ${heatMode}`} />
    </>
  )
}

export default ThermostatFace;
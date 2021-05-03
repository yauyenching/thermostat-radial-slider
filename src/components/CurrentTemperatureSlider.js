import React, { Component } from 'react';
import './CurrentTemperatureSlider.css';

function CurrentTemperatureSlider(props) {
  function onChangeCurrTemperature(e) {
    props.handleChangeCurrTemp(e.target.value);
  }

  const currTemp = props.currTemp;

  return (
    <div className="CurrentTemperatureSlider">
      <div id="CurrTempInput">
        Set Current Temperature
        <input id="TempNum" type="number" min="32" max="100" value={currTemp} onChange={onChangeCurrTemperature} />
        <input className="TempRange" type="range" min="32" max="100" value={currTemp} onChange={onChangeCurrTemperature} />
      </div>
    </div>
  )
}

export default CurrentTemperatureSlider;
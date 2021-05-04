import React from 'react';
import './CurrentTemperatureSlider.css';

function CurrentTemperatureSlider(props) {
  function onChangeCurrTemperature(e) {
    props.handleChangeCurrTemp(Number(e.target.value).toFixed(1));
  }

  const currTemp = Number(props.currTemp).toFixed(1);

  return (
    <div className="CurrentTemperatureSlider">
      <div id="CurrTempInput">
        Set Current Temperature
        <input id="TempNum" type="number" min="32" max="100" step="0.5" value={currTemp} onChange={onChangeCurrTemperature} />
        <input className="TempRange" type="range" min="32" max="100" step="0.5" value={currTemp} onChange={onChangeCurrTemperature} />
      </div>
    </div>
  )
}

export default CurrentTemperatureSlider;
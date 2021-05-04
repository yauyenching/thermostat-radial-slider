import React from 'react';
import './TemperatureGauges.css';

const TemperatureGauges = (props) => {
  const currTemp = Number(props.currTemp).toFixed(1);
  const targetTemp = props.targetTemp;
  const targetTempDecimal = props.targetTempDecimal;

  return (
    <div className="TemperatureGauges">
      <div className="TargetTemperature">{targetTemp}</div>
      <div className="TargetTemperature" style={{ fontSize: 72 }}>.{targetTempDecimal}</div>
      <div className="CurrentTemperature">Current: {currTemp}</div>
    </div>
  )
}

export default TemperatureGauges;
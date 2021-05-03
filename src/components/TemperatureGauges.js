import React, { Component } from 'react';
import './TemperatureGauges.css';

function TemperatureGauges(props) {
  const currTemp = props.currTemp;
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
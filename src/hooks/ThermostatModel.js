import { useState } from 'react';
import { useMachine } from '@xstate/react';
import { createMachine, interpret } from 'xstate';

const ThermostatModel = () => {
  const [currTemp, setCurrTemp] = useState(72.0);
  const [targetTemp, setTargetTemp] = useState(72.0);
  const [targetTempDecimal, setTargetTempDecimal] = useState(0);
  const [mode, setMode] = useState('off');

  const indexToTemp = (index) => {
    return (index / 2 + 50);
  }

  /** ----------------------------------------------------------------
   *  Convenience functions to find current state of thermostat based
   *  on current and target temperatures
   */
  const dT = 2;
  const dTCool = 1.5;
  const dTHeat = 1;

  const isTooHot = () => {
    return currTemp > targetTemp + dT + dTCool;
  }

  const isCooled = () => {
    return currTemp <= targetTemp + dT - dTCool
  }

  const isTooCold = () => {
    return currTemp < targetTemp - dT - dTHeat;
  }

  const isHeated = () => {
    return currTemp >= targetTemp - dT + dTHeat;
  }

  /** ----------------------------------------------------------------
   *  Change thermostat mode based on current and target temperatures
   */
  const changeMode = () => {
    switch (mode) {
      case 'off':
        if (isTooHot()) setMode('cooling');
        else if (isTooCold()) setMode('heating');
        break;
      case 'cooling':
        if (isCooled()) setMode('off');
        break;
      case 'heating':
        if (isHeated()) setMode('off');
        break;
    }
  }

  /** ----------------------------------------------------------------
   *  Create XState mode machine
   */

  // Inspiration: https://dev.to/codingdive/state-machine-advent-update-xstate-context-with-actions-1e9d
  // Referenced https://github.com/davidkpiano/xstate#history-states
  const thermostatMachine = createMachine({
    id: 'thermostatMode',

    context: {
      currTemp: currTemp,
      targetTemp: targetTemp
    },

    initial: 'thermostat',

    states: {
      thermostat: {
        initial: 'off',
        states: {
          off: {
            entry: ['checkComfort'],
            on: {
              isTooCold: {
                target: 'heating',
                action: ['turnOnCooler']
              },
              isTooHot: {
                target: 'cooling',
                action: ['turnOnHeater']
              }
            }
          },
          heating: {
            entry: ['checkHeated'],
            on: {
              isHeated: {
                target: 'off',
                action: ['turnOffHeater']
              }
            }
          },
          cooling: {
            entry: ['checkCooled'],
            on: {
              isCooled: {
                target: 'off',
                action: ['turnOffCooler']
              }
            }
          },
          hist: { type: 'history' }
        },
        on: { input: 'tempChange' }
      },
      tempChange: {
        on: {
          changeTargetTemp: {
            target: 'thermostat.hist',
            actions: ['updateTargetTemp']
          },
          changeCurrentTemp: {
            target: 'thermostat.hist',
            actions: ['updateCurrTemp']
          }
        }
      }
    },

    actions: {
      checkComfort: (context, event) => {
        if (isTooHot()) send('isTooHot');
        else if (isTooCold()) send('isTooCold');
      },
      checkHeated: (context, event) => {
        if (isHeated()) send('isHeated');
      },
      turnOnCooler: (context, event) => {
        if (isCooled()) send('isCooled');
      },
      turnOnHeater: (context, event) => {
        setMode('heating');
      },
      turnOnCooler: (context, event) => {
        setMode('cooling');
      },
      turnOffHeater: (context, event) => {
        setMode('off');
      },
      turnOffCooler: (context, event) => {
        setMode('off');
      },
      updateTargetTemp: (context, event) => {
        const decimal = (context.targetTemp % 1 === 0) ? 0 : 5;
        setTargetTemp(Math.floor(context.targetTemp));
        setTargetTempDecimal(decimal);
      },
      updateCurrTemp: (context, event) => {
        setCurrTemp(context.CurrTemp);
      }
    }
  });

  /* const thermostatService = interpret(thermostatMachine)
    .onTransition((state) => console.log(state.value))
    .start(); */

  /** ----------------------------------------------------------------
   *  Functions to handle change in current and target temperatures
   */
  const [send] = useMachine(thermostatMachine);

  // send is errored as not being a function so XState machine is currently unusable

  const handleChangeCurrTemp = (value) => {
    if (value >= 32 && value <= 100) {
      setCurrTemp(value);
      changeMode();
      /* send({
        type: 'changeCurrTemp',
        currTemp: value
      }) */
      console.log(mode + ", currTemp: " + value);
    }
  }

  const handleChangeTargetTemp = (value) => {
    const temp = indexToTemp(value);
    if (temp >= 50 && temp <= 80) {
      const decimal = (temp % 1 === 0) ? 0 : 5;
      setTargetTemp(Math.floor(temp));
      // console.log("targetTemp: " + targetTemp);
      setTargetTempDecimal(decimal);
      changeMode();
      /* send({
        type: 'changeTargetTemp',
        targetTemp: temp
      }) */
      console.log(mode + ", targetTemp: " + temp);
    }
  }

  return { mode, currTemp, targetTemp, targetTempDecimal, handleChangeCurrTemp, handleChangeTargetTemp }
}

export default ThermostatModel;



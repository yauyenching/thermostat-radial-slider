# thermostat-radial-dashboard

## File Structure
```
src/
    assets/                               # SVGs for rendering
    components/                           # UI logic
        Face/
            TemperatureGauges.js
            ThermostatFace.js
        RadialSlider/
            RadialSliderMarksTrack.js
            RadialSliderThumb.js
        CurrentTemperatureSlider.js
    containers/                           # Presentation logic
        Thermostat.js
    hooks/                                # Business logic
        ThermostatModel.js
    utils/                                # Convenience and auxiliary functions
        AngleOffset.js
```

### TemperatureGauges
This component shows the `currentTemperature` and `targetTemperature` on the Thermostat face.

### ThermostatFace
This component is in charge of all the color changing logic for the thermostat face when the mode changes upon user input.

### RadialSliderMarksTrack
This component generates the slider marks track for the thermostat face.

### RadialSliderThumb
This component is responsible for capturing user input such as mouse wheel and drag and subsequently updating the `targetTemperature` through callback functions.

### CurrentTemperatureSlider
Debugging slider so that we can test out the application by manipulating the `currentTemperature`.

### Thermostat
This component collects the business and UI logic from a myriad of components and then layers them for rendering on the DOM.

### ThermostatModel
This is where the actual data for `currentTemperature`, `targetTemperature`, and `mode` of the thermostat resides. Changes which happen because of user input are propagated to functions from this file. This is also where the XState state machine resides, which is intended to facilitate the mode checking and changing of the thermostat.

### AngleOffset
This is where functions for calculating the translation and rotation offset for positioning the radial slider thumb and marks go.

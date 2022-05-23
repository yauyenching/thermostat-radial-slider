<h1 align="center">Thermostat Radial Slider</h1>
<p align="center">
  <a href = "https://reactjs.org"><img src="https://img.shields.io/badge/Made%20with-React-23425C?logo=react"></a>
  <a href = "https://github.com/yauyenching/thermostat-radial-slider/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-informational"></a>
</p>
This is a custom UI component for a skeuomorphic smart thermostat user interface to control heating and cooling. The simplified behavior is as follows:
<br><br>
<div align="center">
Target Temperature: <i>T<sub>t</sub></i>, Current Temperature: <i>T<sub>c</sub></i>

| Temperatures | Thermostat Behavior | Thermostat Face Color |
| :--: | :--: | :--: |
| <i>T<sub>t</sub></i> > <i>T<sub>c</sub></i><br>| Heating | Red |
| <i>T<sub>t</sub></i> < <i>T<sub>c</sub></i><br>| Cooling | Blue |
</div>

The user sets the target temperature by either dragging the slider thumb on radial slider interface or by scrolling the mouse wheel. There is a debugging slider for the user to simulate different current room temperatures. This was built as part of an assignment for the module CS3249 User Interface Development at National University of Singapore.

## ✨ Preview ##
<div align="center">
  <img src="https://raw.githubusercontent.com/yauyenching/thermostat-radial-slider/master/preview/thermostat_hotter.gif" width="300">
  <img src="https://raw.githubusercontent.com/yauyenching/thermostat-radial-slider/master/preview/thermostat_colder.gif" width="300">
  <h3>Visit the live interactive demo <a href="https://yauyenching.github.io/thermostat-radial-slider/">here</a>!</h3>
</div>

## 🛠️ Implementation ##
This project was bootstrapped using [Create React App](https://github.com/facebook/create-react-app) and coded using React hooks.

## 🧰 Dependencies ##
* [Material-UI](https://v4.mui.com/)
* [FontAwesome](https://fontawesome.com/docs/web/use-with/react/)
* [XState](https://xstate.js.org/docs/)

## ⚙️ Building this Project ##
To deploy this application locally, install [Node.js](https://nodejs.org/en/) on your system if you have yet to do so. Clone this repository and navigate to its directory. Then, in the terminal,
```
npm install # install all dependencies
npm start # run a local instance
```

## 📖 Documentation ##
### 📂 File Structure
Here is the core file structure of the app with styling-related files omitted. .CSS files are named after the file that is referencing it and are placed in the same folder.
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
The functions of the React components and JavaScript files are as follows:

#### TemperatureGauges
This component shows the `currentTemperature` and `targetTemperature` on the Thermostat face.

#### ThermostatFace
This component is in charge of all the color changing logic for the thermostat face when the mode changes upon user input.

#### RadialSliderMarksTrack
This component generates the slider marks track for the thermostat face.

#### RadialSliderThumb
This component is responsible for capturing user input such as mouse wheel and drag and subsequently updating the `targetTemperature` through callback functions.

#### CurrentTemperatureSlider
Debugging slider so that we can test out the application by manipulating the `currentTemperature`.

#### Thermostat
This component collects the business and UI logic from a myriad of components and then layers them for rendering on the DOM.

#### ThermostatModel
This is where the actual data for `currentTemperature`, `targetTemperature`, and `mode` of the thermostat resides. Changes which happen because of user input are propagated to functions from this file. This is also where the XState state machine resides, which is intended to facilitate the mode checking and changing of the thermostat.

#### AngleOffset
This is where functions for calculating the translation and rotation offset for positioning the radial slider thumb and marks go.

## 📝 License ##
This project is licensed under the MIT License - see the [LICENSE](https://github.com/yauyenching/thermostat-radial-slider/blob/master/LICENSE) file for details.

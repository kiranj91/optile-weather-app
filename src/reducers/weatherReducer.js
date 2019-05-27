import initialState from './initialState';
import { FETCH_WEATHER, RECEIVE_WEATHER, TEMP_UNIT_CHANGED, UPDATE_WEATHER } from '../actions/actionTypes';

// Handles/ Reduces the weather data depending upon the action type carried.
export default function weatherData( state = initialState.weatherData, action) {
  let newState;
  switch ( action.type) {
    case FETCH_WEATHER:
      return action;
    case RECEIVE_WEATHER:
      newState = initWeatherState( action.weather);
      return newState;
    case TEMP_UNIT_CHANGED:
      newState = onTempUnitChange( action);
      return newState;
    case UPDATE_WEATHER:
      newState = updateWeatherState( action);
      return newState;
    default:
      return state;
  }
}

// Initiates the Weather State( Application level state) to the default values.
const initWeatherState = ( weather) => {
  if( weather) {
    return {
      tempUnit: "imperial",
      forecastArray: weather.forecastArray,
      temperatureArray: weather.temperatureArray,
      showLeftNav: false,
      showRightNav: true,
      pageSize: 3,
      startCounter: 0,
      forecastCount: weather.forecastArray.length,
      wCardsToShow: weather.forecastArray.slice( 0, 3),
      tempChartsToShow: weather.temperatureArray.slice( 0, 3)
    }
  }
  return weather;
}


// Repopulates the ForecastArray and Temperature Arrays to have new weather data in selected Temperature Unit.
const onTempUnitChange = ( action) => {
  const weatherObj = action.prevState.weatherData;
  const counter = weatherObj.startCounter;
  const pageSize = weatherObj.pageSize;

  let newWeatherState = { ...weatherObj};
  newWeatherState.temperatureArray = action.weather.temperatureArray;
  newWeatherState.forecastArray = action.weather.forecastArray;
  newWeatherState.wCardsToShow = action.weather.forecastArray.slice( counter, counter+pageSize);
  newWeatherState.tempChartsToShow = action.weather.temperatureArray.slice( counter, counter+pageSize);
  newWeatherState.tempUnit = action.tempUnit;

  return newWeatherState;
}

// Updates the WeatherCard Data, and Temperature Chart Data to be shown upon navigation.
const updateWeatherState = ( action) => {
  let newWeatherState = { ...action.prevState, ...action.updatedProps};
  return newWeatherState;
}

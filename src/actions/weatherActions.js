import axios from 'axios';
import moment from 'moment';

import * as actionTypes from './actionTypes';
import * as constants from '../constants';

// action for receiving the weather data.
export const receiveWeather = ( data) => {
  return { type: actionTypes.RECEIVE_WEATHER, weather: data};
}

// action for temperature unit change.
export const onTempUnitChange = ( data, tempUnit, prevState) => {
  return { type: actionTypes.TEMP_UNIT_CHANGED, weather: data, tempUnit: tempUnit, prevState: prevState};
}

// action for sliding the weather cards.
export const updateWeather = ( prevState, updatedProps) => {
  return { type: actionTypes.UPDATE_WEATHER, prevState: prevState, updatedProps: updatedProps};
}

// fetch the weather data from OpenWeatherMap API.
export const fetchWeather = ( tempUnit) => {
  const unit = tempUnit ? tempUnit : 'imperial';
  var url = returnUrl( unit);
  return ( dispatch, getState) => {
    axios.get( url)
        .then( response => {
             if ( response && response.status === 200 ) {
                 const prevState = getState();
                 const { forecastArray, temperatureArray } = populateWeatherData( response, prevState, tempUnit);
                 if( tempUnit && prevState.weatherData) {
                   dispatch( onTempUnitChange({
                     forecastArray: forecastArray,
                     temperatureArray: temperatureArray
                   }, tempUnit, prevState))
                  }  else {
                   dispatch( receiveWeather({
                     forecastArray: forecastArray,
                     temperatureArray: temperatureArray
                   }))
                 }
             } else {
                  var flash = {
                      type: 'error',
                      title: 'Error getting Weather Data!',
                      content: 'There was an error getting the Weather Data. Please try again.'
                  }
                  dispatch( { type: "DISPLAY_FLASH", data: flash} )
             }
        })
        .catch(error => {});
    };
}

// populate the weather data to be shown in the weather cards.
const populateWeatherData = ( response, prevState, unit) => {
    let forecastArray = [];
    let temperatureArray = [];
    response.data.list.map( ( item, key) => {
      const { main, icon } = item.weather[0];
      const { temp, humidity } = item.main;
      const { speed } = item.wind;
      const momDt = moment( (new Date( item.dt * 1000)));
      const date = momDt.format( 'dddd, Do MMMM');
      const time = ( item.dt_txt.split( ' ')[1]);
      const name = response.data.city.name;
      forecastArray.push({
          condition: main,
          date: date,
          time: time,
          icon: `${constants.OPEN_WEATHER_MAP_IMG_URL}/${icon}.png`,
          location: name,
          temperature: {
              temp: temp,
              humidity: humidity,
              tempUnit: unit
          },
          windSpeed: speed
      })
      temperatureArray.push({
        temp : temp,
        date : date,
        time: time,
        tempUnit: unit
      })
    })

    return {
      forecastArray: forecastArray,
      temperatureArray: temperatureArray
    }
}

// returns the URL for fetching the weather data( with APPID)
const returnUrl = ( unit) => {
  return `${constants.OPEN_WEATHER_MAP_BASE_URL}/forecast?q=${constants.DEFAULT_LOCATION}&APPID=${constants.OPEN_WEATHER_MAP_API_KEY}&cnt=30&units=`+unit;
}

// dispatches the weather data to the store.
export function tempUnitChanged( event) {
  return ( dispatch, getState) => {
    dispatch( fetchWeather( event.target.value));
  };
}

// on listener function for navigating left in the weather cards.
export function onNavigateLeft( ) {
    return( dispatch, getState) => {
      const prevState = getState();
      const weatherObj = prevState.weatherData;
      let count = weatherObj.startCounter;
      const length = weatherObj.forecastCount;
      const pageSize = weatherObj.pageSize;
      count--;
      let leftShow = true;
      let rightShow = false;
      if( count === 0)
        leftShow = false;
      if( count+pageSize <= length)
        rightShow = true;
      let currWCards = weatherObj.forecastArray.slice( count, count+pageSize);
      let currTCharts = weatherObj.temperatureArray.slice( count, count+pageSize);
      const newWeatherState = {
        startCounter : count,
        showLeftNav: leftShow,
        showRightNav: rightShow,
        wCardsToShow: currWCards,
        tempChartsToShow: currTCharts
      }
      dispatch( updateWeather( weatherObj, newWeatherState));
    }
}

// on listener function for navigating right inthe weather cards.
export function onNavigateRight( ) {
    return( dispatch, getState) => {
      const prevState = getState();
      const weatherObj = prevState.weatherData;
      let count = weatherObj.startCounter;
      let length = weatherObj.forecastCount;
      const pageSize = weatherObj.pageSize;
      count++;
      let currWCards = weatherObj.forecastArray.slice( count, count+pageSize);
      let currTCharts = weatherObj.temperatureArray.slice( count, count+pageSize);
      let leftShow = false;
      let rightShow = true;
      if( count > 0)
        leftShow = true;
      if( count+pageSize === length)
        rightShow = false;
      const newWeatherState = {
        startCounter : count,
        showLeftNav: leftShow,
        showRightNav: rightShow,
        wCardsToShow: currWCards,
        tempChartsToShow: currTCharts
      }
      dispatch( updateWeather( weatherObj, newWeatherState));
    }
}

import React from 'react';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import WeatherCard from '../WeatherCard/';
import WeatherBarChart from '../WeatherBarChart/';
import { TempRadio } from '../../TempRadio/';
import { CardArrow } from '../../CardArrow/';

import { tempUnitChanged } from '../../../actions/weatherActions';
import { onNavigateLeft } from '../../../actions/weatherActions';
import { onNavigateRight } from '../../../actions/weatherActions';

// Container which renders the TempRadio, CardArrow, WeatherCard, and WeatherBarChart components
const WeatherInfo = ( { weatherData, tempUnitChanged, onNavigateLeft, onNavigateRight } ) => {
  const location = weatherData.forecastArray[0].location;
  return (  <Grid container spacing={3}>
        <Grid item xs={12}>
          <TempRadio tempUnit={weatherData.tempUnit} onChange={( event) => tempUnitChanged( event)}/>
        </Grid>
        <Grid item xs={6}>
          <CardArrow direction="left" visibility={weatherData.showLeftNav} onClick={() => onNavigateLeft()}/>
        </Grid>
        <Grid item xs={6}>
          <CardArrow direction="right" visibility={weatherData.showRightNav} onClick={() => onNavigateRight()}/>
        </Grid>
        <Grid item xs={12}>
          <h2>{location}</h2>
        </Grid>
        {
          weatherData.wCardsToShow.map( ( value, key) => {
              return <Grid item xs={4}>
                      <WeatherCard weather={ value }/>
                     </Grid>
          })
        }
        <Grid item xs={12}>
          <WeatherBarChart tempUnit={weatherData.tempUnit} temperatureArray={weatherData.tempChartsToShow}/>
        </Grid>
      </Grid>
          )
}

WeatherInfo.propTypes = {
  weatherData: PropTypes.object,
  tempUnitChanged: PropTypes.func,
  onNavigateLeft: PropTypes.func,
  onNavigateRight: PropTypes.func
}

const mapStateToProps = state => ({
  weatherData: state.weatherData
})

export default connect(
  mapStateToProps,
  { tempUnitChanged, onNavigateLeft, onNavigateRight }
)(WeatherInfo)

import React from 'react';
import Card from '@material-ui/core/Card';
import Slide from "@material-ui/core/Slide";
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { weatherHelper } from '../../../helpers/index';
import { speedHelper } from '../../../helpers/index';
import { percentHelper } from '../../../helpers/index';
import { timeHelper } from '../../../helpers/index';

import { WiHumidity } from 'react-icons/wi';
import { FaWind } from 'react-icons/fa';

import './index.css';

// React component to render weather card showing weather details
function WeatherCard( props) {
  const weatherObj = props.weather;
  const tempUnit = weatherObj.temperature.tempUnit;
  return (
    <Slide direction="down" in={true}>
      <Card className="WeatherCard">
          <CardContent>
          <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className="PrimaryText">
              {weatherObj.date}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="PrimaryText">
              { timeHelper( weatherObj.time) }
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="PrimaryText">
                <img className="WeatherIcon" alt={ weatherObj.condition } src={ weatherObj.icon } />
                <span className="TemperatureData">{ weatherHelper( weatherObj.temperature.temp, tempUnit) }</span>
            </div>
          </Grid>
          <Grid item xs={12}>
              <span className="weatherCondition">{ weatherObj.condition }</span>
          </Grid>
          <Grid item xs={12}>
            <WiHumidity className="humidityIcon" title="Humidity"/>
            <div className="humidityData">{ percentHelper( weatherObj.temperature.humidity) }</div>
          </Grid>
          <Grid item xs={12}>
            <FaWind className="windIcon" title="Wind Speed"/>
            <div className="windData">{ speedHelper( weatherObj.windSpeed, tempUnit) }</div>
          </Grid>
        </Grid>
          </CardContent>
        </Card>
      </Slide>
  );
}

export default WeatherCard;

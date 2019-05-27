import React from 'react';
import Slide from "@material-ui/core/Slide";

import { Bar } from './Bar';

import './index.css';

// React Component to render Column Chart( Temperature data for 3 hours).
function WeatherBarChart( props) {
  const maxTemp = Math.max.apply( Math, props.temperatureArray.map( function(o) { return o.temp; }));
  return (
    <Slide direction="up" in={true}>
      <div className="BarChartDiv">
        <div className="BarChartDivSub">
        {
          props.temperatureArray.map( ( value, key) => {
              return <Bar maxValue={maxTemp} value={value} />
          })
        }
        </div>
      </div>
    </Slide>
  );
}

export default WeatherBarChart;

import React from 'react';
import Grid from '@material-ui/core/Grid';

import { weatherHelper } from '../../../helpers/index';
import { timeHelper } from '../../../helpers/index';

import './index.css';

function Bar( props) {
  const temperatureObj = props.value;
  const height = temperatureObj.temp / ( props.maxValue) * 100;
  const tempUnit = temperatureObj.tempUnit;
  const style = { height: height + "%" };
  return (
    <Grid container spacing={1} className="ChartGrid">
      <Grid item xs={12} className="ChartGrid">
        <div
    		 	className="BarChartItem"
    		 	style={style}>
    		 	<span className="BarTopSpan">{ weatherHelper( temperatureObj.temp, tempUnit) }</span>
    		 </div>
       </Grid>
       <Grid item xs={12}>
          <span className="BarBottomSpan">{ timeHelper( temperatureObj.time ) }</span>
      </Grid>
    </Grid>
  );
}

export { Bar };

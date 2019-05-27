import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import './index.css';

const useStyles = makeStyles( theme => ({
  progress: {
    margin: theme.spacing( 2),
  },
}));

// React Component for rendering the loading spinner while fetching the weather data.
function Loading() {
  const classes = useStyles();
  return (
    <div className="SpinnerClass">
      <div>Loading...</div>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

export default Loading;

// Helper method to display temperature in readable manner.
export const weatherHelper = ( value, unit) => {
  let tempSuffix = ' °F';
  if( unit === 'metric')
    tempSuffix = ' °C';
  return value + tempSuffix;
}

// Helper method to display Wind Speed data in readable manner.
export const speedHelper = ( value, unit) => {
  let tempSuffix = ' miles/hour';
  if( unit === 'metric')
    tempSuffix = ' meter/sec';
  return value + tempSuffix;
}

// Helper method to display Humidity Percent Value in readable manner.
export const percentHelper = ( value) => {
  let percSuffix = ' %';
  return value + percSuffix;
}

// Helper method to display Time Data in readable manner.
export const timeHelper = ( value) => {
  let valueArr = value.split( ":");
  valueArr.pop();
  return valueArr.join( ':');
}

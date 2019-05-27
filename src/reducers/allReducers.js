import { combineReducers } from 'redux';
import weatherData from './weatherReducer';

// To combine all the reducers single handedly
const rootReducer = combineReducers({
   weatherData
});

export default rootReducer;

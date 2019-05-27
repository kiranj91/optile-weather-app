import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import { fetchWeather } from './actions/weatherActions';
import configureStore from './store/configureStore';
import './index.css';
 
const store = configureStore();

store.dispatch( fetchWeather());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById( 'root')
);

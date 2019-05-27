import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import WeatherInfo from '../components/Weather/WeatherInfo/';
import Loading from '../components/Loading/';
import * as weatherActions from '../actions/weatherActions';

import './index.css';

// Container Component to render WeatherInfo Component, and has connection to the store.
class App extends React.Component {
    render() {
      return (
        <div>
          {
            !this.props.weatherData &&
            <Loading />
          }
          {
            this.props.weatherData &&
            <div style={{ "textAlign" : "center"}}>
              <div className="AppContainerDiv">
                <WeatherInfo weatherData={ this.props.weatherData }/>
              </div>
            </div>
          }
        </div>
      )
    }
}

WeatherInfo.propTypes = {
    weatherActions: PropTypes.object,
    weatherData: PropTypes.object
};

// method to map the global states to that of properties.
const mapStateToProps = ( state) => {
    return {
        weatherData: state.weatherData
    };
}

// method to map the actions to that of properties.
const mapDispatchToProps = ( dispatch) => {
    return {
       weatherActions: bindActionCreators( weatherActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

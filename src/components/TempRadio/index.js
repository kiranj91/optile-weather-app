import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './index.css';

// React Component for rendering the Radio group to select between Metric and Imperial Temperature Unit.
class TempRadio extends React.Component {
  render() {
    return (
      <RadioGroup name="Temperature Unit" className="RadioGroup" value={ this.props.tempUnit } onChange={ this.props.onChange } row>
        <FormControlLabel
          className="LeftRadio"
          value="metric"
          control={<Radio color="primary" />}
          label="Celsius"
          labelPlacement="end"
        />
        <FormControlLabel
          className="RightRadio"
          value="imperial"
          control={<Radio color="primary" />}
          label="Fahrenheit"
          labelPlacement="end"
        />
      </RadioGroup>
    )
  }
}

export { TempRadio }

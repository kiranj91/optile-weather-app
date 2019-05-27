import React from 'react';
import Fab from '@material-ui/core/Fab';
import ChevronLeftSharp from '@material-ui/icons/ChevronLeftSharp';
import ChevronRightSharp from '@material-ui/icons/ChevronRightSharp';

import './index.css';

//React Component to render Navigation element.
class CardArrow extends React.Component {
  render() {
    return (
      <div>
         {
            this.props.direction === "left" && this.props.visibility &&
            <Fab onClick={ this.props.onClick }
              className="FabLeft"
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
            ><ChevronLeftSharp /></Fab>
         }
         {
            this.props.direction === "right" && this.props.visibility &&
            <Fab onClick={ this.props.onClick }
              className="FabRight"
              variant="extended"
              size="large"
              color="primary"
              aria-label="Add"
            ><ChevronRightSharp /></Fab>
         }
      </div>
    )
  }
}

export { CardArrow };

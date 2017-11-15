import * as React from 'react';
import * as PropTypes from 'prop-types'; // ES6

import './spinner-circle.css';

export default class SpinnerCircle extends React.Component<any, any> {

  static propTypes = {
    width: PropTypes.number.isRequired,
    color: PropTypes.string
  }

  render() {

    let width = this.props.width;

    return (
      <div className="spinerContainer">
        <div className="spinnerDiv">
          <svg className="spinner" width={`${width}px`} height={`${width}px`} viewBox="0 0 66 66">
            <circle className="path"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33" cy="33" r="30"
                    style={{stroke: this.props.color ? this.props.color : 'white'}}
            />
          </svg>
        </div>
      </div>
    );
  }
}
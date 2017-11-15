import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'; // ES6

import styles from './spinner-circle.css';

export default class SpinnerCircle extends React.Component {

  render() {

    let width = this.props.width;

    return (
      <div className={styles.spinerContainer} >
        <div className={styles.spinnerDiv}>
          <svg className={styles.spinner} width={`${width}px`} height={`${width}px`} viewBox="0 0 66 66">
            <circle className={styles.path}
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

SpinnerCircle.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string
};
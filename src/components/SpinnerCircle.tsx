import * as React from 'react';
import * as PropTypes from 'prop-types';

const SpinnerCircle: React.SFC<SpinnerCircleProps> = ({size, color}) => (
  <div className="spinerContainer">
    <div className="spinnerDiv">
      <svg className="spinner" width={`${size}px`} height={`${size}px`} viewBox="0 0 66 66">
        <circle className="path"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33" cy="33" r="30"
                style={{stroke: color}} />
      </svg>
    </div>
  </div>
)

interface SpinnerCircleProps {
  size: number
  color?: string
}

SpinnerCircle.defaultProps = {
  color: 'white'
}

export default SpinnerCircle;
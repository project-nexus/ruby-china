import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

export default class UserAvatar extends React.Component<any, any> {

  static propTypes = {
    size: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    radius: PropTypes.number,
    username: PropTypes.string.isRequired
  }

  render() {
    var style = {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.radius || 0
    };

    return (
      <Link to={`/${this.props.username}`}>
        <img style={style} src={this.props.src} />
      </Link>);
  }
}


import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Avatar: React.SFC<AvatarProps> = ({size, src, radius, username}) => {

  const style = {
    width: size,
    height: size,
    borderRadius: radius || 0
  };

  return (
    <Link to={`/${username}`}>
      <img style={style} src={src} />
    </Link>
  );
}

interface AvatarProps {
  size: number
  src: string
  radius?: number
  username: string
}

export default Avatar;

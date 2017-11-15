import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import UserAvatar from '../shared/user-avatar';
import { followUser, unfollowUser } from '../../actions/user';
import { authenticatedAction } from '../../lib/util';
import './profile-user-details.css';

export default class ProfileUserDetails extends React.Component<any, any> {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  handleClick(user: any) {
    const { dispatch } = this.props;

    if (user.meta.followed) {

      authenticatedAction(dispatch, () => {
        dispatch(unfollowUser(user));
      });

    } else {

      authenticatedAction(dispatch, () => {
        dispatch(followUser(user));
      });
    }
  }


  render() {

    const { user, location } = this.props;

    let userInfoArray = [];
    let userCompanyLocation = "";
    let joinTime = "";
    let followingText = "关注";

    if (user.company && user.company.length > 0) {
      userInfoArray.push(user.company);
    }

    if (user.location && user.location.length > 0) {
      userInfoArray.push(user.location);
    }

    if (userInfoArray.length === 2) {
      userCompanyLocation = userInfoArray.join("@");
    }

    if (userInfoArray.length === 1) {
      userCompanyLocation = userInfoArray[0];
    }

    if (user.created_at && user.created_at.length > 0) {
      joinTime = `${user.created_at.slice(0, 10)} 加入`;
    }

    if (user.meta && user.meta.followed) {
      followingText = "取消关注";
    }

    return (
      <div className="profileUserDetailsContainer">
          <UserAvatar
            size={56}
            radius={6}
            src={user.avatar_url}
            username={user.login}
          />
          <div className="profileInfo">

            <div className="profileUserDetailsItem">
              <div className="profileFullname">{`${user.name || user.login}`}</div>
              {
                location.pathname !== '/me' ?
                (
                  <button className="profileFollowButton"
                          onClick={this.handleClick.bind(this, user)}>
                    {followingText}
                  </button>
                )
                : null
              }
            </div>

            <div className="profileUsername">{`${user.login}`}</div>
            <div>{userCompanyLocation}</div>
            <div>{joinTime}</div>
          </div>
      </div>
    );
  }
}


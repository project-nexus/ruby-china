import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import UserAvatar from '../shared/user-avatar';
import SpinnerCircle from '../shared/spinner-circle';
import './profile-list.css';


export default class ProfileUserList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.renderUserList = this.renderUserList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderUserList() {

    const { user, type, entities } = this.props;

    if (typeof user === 'undefined' || typeof user[type] === 'undefined') {
       if (type === "followers") {
        return <div>没有关注你的人</div>;
      } else {
        return <div>没有关注者</div>;
      }
    }

    if (user[type].length === 0) {
      if (type === "followers") {
        return <div>没有关注你的人</div>;
      } else {
        return <div>没有关注者</div>;
      }
    }

    return user[type].map((userId: any) => {

      const userItem = entities.users[userId];

      return (
        <div key={`ProfileUserList-${type}-${userId}`}
             className={"profileListItemContainer profileListUserItemContainer"}>

          <UserAvatar size={30} src={userItem.avatar_url} radius={5} username={userItem.login} />

          <Link to={`/${userItem.login}`}>
            <div className="profileUserInfo">
              <div className="profileFullname">{ userItem.name }</div>
              <div className="profileUsername">{ userItem.login }</div>
            </div>
          </Link>
        </div>
      );

    });
  }

  renderSpinner(): any {
    if (this.props.isLoadingMore) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }
  }


  render() {
    return (
      <div className="profileListContainer">
        { this.renderUserList() }
        { this.renderSpinner() }
      </div>
    )
  }
}
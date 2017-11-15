import * as React from 'react';
import UserAvatar from '../shared/user-avatar';
import './reply-list-item.css';

export default class ReplyListItem extends React.Component<any, any> {

  render() {
    const { user, reply } = this.props;

    const replyBodyHtml = {__html: reply.body_html};

    return (
      <div className="replyListItemContainer">
        <UserAvatar size={48} radius={5}
                    src={user.avatar_url}
                    username={user.login} />
        <div className="replyMain">
          <div className="topicInfo">
            <span className="topicLogin">{`@${user.login}`}</span>
          </div>
          <div dangerouslySetInnerHTML={replyBodyHtml} />
        </div>
      </div>
    );
  }
}
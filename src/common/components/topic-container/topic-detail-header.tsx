import * as React from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import '../../assets/stylesheets/highlight.css';
import './topic-detail-header.css';

export default class TopicDetailHeader extends React.Component<any, any> {

  render() {

    let user = this.props.user;
    let topic = this.props.topic;

    return (
      <div className="topicHeaderContainer">

        <UserAvatar size={48} radius={5}
                    src={user.avatar_url}
                    username={user.login} />

        <div className="topicMain">
          <div className="topicInfo">
            <span className="topicNode">{topic.node_name}</span>
            <span className="topicLogin">{`@${user.login}`}</span>
          </div>
          <h1 className="topicTitle">{topic.title}</h1>
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import * as PropTypes from 'prop-types'; // ES6
import { Link } from 'react-router-dom';
import UserAvatar from '../shared/user-avatar';
import './notification-topic-reply-item.css';


export default class NotificationTopicReplyItem extends React.Component<any, any> {

  static propTypes = {
    notification: PropTypes.object.isRequired,
    actor: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    reply: PropTypes.object.isRequired
  }

  render() {
    const { actor, topic, reply } = this.props;
    return (
      <div className="topicReplyItemContainer">
        <UserAvatar
          size={32}
          radius={4}
          src={actor.avatar_url}
          username={actor.login} />
        <div className="topicReplyItemDetails">
          <div className="topicReplyItemInfo">
            在帖子 <Link to={`/topics/${topic.id}`}>{topic.title}</Link> 回复了
          </div>
          <div className="topicReplyItemContent" dangerouslySetInnerHTML={{__html: reply.body_html}} />
        </div>
      </div>
    );
  }
}

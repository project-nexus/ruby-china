import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'; // ES6
import { Link } from 'react-router';
import UserAvatar from '../shared/user-avatar';
import styles from './notification-topic-reply-item.css';


export default class NotificationTopicReplyItem extends Component {

  render() {
    const { actor, topic, reply } = this.props;
    return (
      <div className={styles.topicReplyItemContainer}>
        <UserAvatar
          size={32}
          radius={4}
          src={actor.avatar_url}
          username={actor.login} />
        <div className={styles.topicReplyItemDetails}>
          <div className={styles.topicReplyItemInfo}>
            在帖子 <Link to={`/topics/${topic.id}`}>{topic.title}</Link> 回复了
          </div>
          <div className={styles.topicReplyItemContent} dangerouslySetInnerHTML={{__html: reply.body_html}} />
        </div>
      </div>
    );
  }
}

NotificationTopicReplyItem.propTypes = {
  notification: PropTypes.object.isRequired,
  actor: PropTypes.object.isRequired,
  topic: PropTypes.object.isRequired,
  reply: PropTypes.object.isRequired
};
import React, {Component} from 'react';
import { getTopic } from '../../actions/topic';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import Spinner from '../shared/spinner';
import '../../assets/stylesheets/highlight.css';
import './topic-detail.css';

export default class TopicDetail extends Component {

  constructor(props) {
    super(props);
    this.renderTopic = this.renderTopic.bind(this);
  }

  componentDidMount() {
    const { dispatch, params, entities } =  this.props;
    const topicId = params.topicId;
    if (!entities.topics[topicId]) {
      dispatch(getTopic(topicId));
    }
  }

  renderSpinner() {
    return (
      <div className="topic-detail-spinner">
        <Spinner />
      </div>
    )
  }

  renderTopic() {
    const { params, entities } = this.props;
    const topic = entities.topics[params.topicId];
    const user = entities.users[topic.user];
    const topicBodyHtml = {__html: topic.body_html};
    return (
      <div className="topic-detail">
        <div className="topic-header-container">

          <UserAvatar size={48} radius={5} src={user.avatar_url} />

          <div className="topic-main">
            <div className="topic-info">
              <span className="topic-node">{topic.node_name}</span>
              <span className="topic-login">{`@${user.login}`}</span>
            </div>
            <h1 className="topic-title">{topic.title}</h1>
          </div>
        </div>

        <div className="topic-detail-container">
          { this.props.topic.isFetching ? this.renderSpinner() : <div dangerouslySetInnerHTML={topicBodyHtml} /> }
        </div>

        <div className="topic-detail-action-bar">
          <TopicActionBar replyCount={topic.replies_count} likeCount={topic.likes_count} />
        </div>
      </div>
    );
  }

  render() {
    return this.renderTopic();
  }
}
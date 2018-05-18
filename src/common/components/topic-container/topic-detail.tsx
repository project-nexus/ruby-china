import * as React from 'react';
import UserAvatar from '../shared/user-avatar';
import TopicActionBar from '../shared/topic-action-bar';
import TopicDetailHeader from './topic-detail-header';
import SpinnerCircle from '../shared/spinner-circle';
import './topic-detail.css';


export default class TopicDetail extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {

    const { match: { params }, entities, dispatch } = this.props;

    const topic = entities.topics[params.topicId];
    if (typeof topic === 'undefined') {
      return null;
    }

    const user = entities.users[topic.user];
    if (typeof user === 'undefined') {
      return null;
    }

    if (this.props.isLoadingPartial) {
      return (
        <div className="topicDetail">
          <TopicDetailHeader topic={topic} user={user} />
          <SpinnerCircle width={30} />
        </div>
      );
    }

    const topicBodyHtml = {__html: topic.body_html};
    return (
      <div className="topicDetail">
        <TopicDetailHeader topic={topic} user={user} />
        <div className="topicDetailBody">
          <div className="markdown" dangerouslySetInnerHTML={topicBodyHtml} ></div>
        </div>
        <div className="topicDetailActionBar">
          <TopicActionBar topic={topic} dispatch={dispatch} interactive={true} />
        </div>
      </div>
    );
  }
}
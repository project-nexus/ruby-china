'use strict';

import * as React from 'react';
// import { browserHistory } from 'react-router';
import { trackScrollPosition } from '../../actions/application';
import UserAvatar from './../shared/user-avatar';
import TopicActionBar from './../shared/topic-action-bar';
import './topic-list-item.css';

export default class TopicListItem extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatch } = this.props;
    dispatch(trackScrollPosition(window.scrollY));
    // browserHistory.push(`/topics/${this.props.topic.id}`);
  }

  render() {
    const { user, topic, dispatch } = this.props;

    return (
      <div className="topicListItemContainer">
        <div className="topicContent">

          <UserAvatar size={48} radius={5}
                      src={user.avatar_url}
                      username={user.login} />

          <div className="topicMain" onClick={this.handleClick}>
            <div className="topicInfo">
              <span className="topicNode">{topic.node_name}</span>
              <span className="topicLogin">{`@${user.login}`}</span>
            </div>
            <p>{topic.title}</p>
            <div className="topicAction">
              <TopicActionBar
                interactive={false}
                dispatch={dispatch}
                topic={topic} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
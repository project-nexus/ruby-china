import * as React from 'react';
import * as PropTypes from 'prop-types'; // ES6

import {
  likeTopic,
  unlikeTopic,
  followTopic,
  unfollowTopic
} from '../../actions/topic';

import { authenticatedAction } from '../../lib/util';
import "./topic-action-bar.css";

export default class TopicActionBar extends React.Component<any, any> {

  static propTypes = {
    topic: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    interactive: PropTypes.bool
  }

  constructor(props: any) {
    super(props);
    this.clickLike = this.clickLike.bind(this);
    this.clickFollow = this.clickFollow.bind(this);
  }

  clickLike(e: any) {

    if (this.props.interactive) {
      e.preventDefault();
      e.stopPropagation();

      const { topic, dispatch } = this.props;

      authenticatedAction(dispatch, () => {
        if (topic.meta && topic.meta.liked) {
          dispatch(unlikeTopic(topic));
        } else {
          dispatch(likeTopic(topic));
        }
      });
    }
  }

  clickFollow(e: any) {

    if (this.props.interactive) {
      e.preventDefault();
      e.stopPropagation();

      const { topic, dispatch } = this.props;

      authenticatedAction(dispatch, () => {
        if (topic.meta && topic.meta.followed) {
          dispatch(unfollowTopic(topic));
        } else {
          dispatch(followTopic(topic));
        }
      });
    }
  }

  render() {

    const { topic, interactive } = this.props;

    return (
      <div className="topicActionContainer">

        <div>
          <i className="fa fa-reply"/>
          <span>{topic['replies_count']}</span>
        </div>

        <div onClick={this.clickLike}>
          <i className="fa fa-thumbs-up" style={{color: interactive && topic.meta && topic.meta.liked ? '#e76f3c' : null }} />
          <span>{topic['likes_count']}</span>
        </div>

        <div onClick={this.clickFollow}>
          <i className="fa fa-eye" style={{color: interactive && topic.meta && topic.meta.followed ? '#e76f3c' : null }} />
        </div>
      </div>
    );
  }
}

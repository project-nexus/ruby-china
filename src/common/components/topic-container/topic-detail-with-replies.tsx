import * as React from 'react';
import * as PropTypes from 'prop-types'; // ES6

import TopicDetail from './topic-detail';
import ReplyList from './reply-list';
import ReplyActionBar from './reply-action-bar';
import SpinnerCircle from '../shared/spinner-circle';

export default class TopicDetailWithReplies extends React.Component<any, any> {

  static propTypes = {
    isLoadingPartial: PropTypes.bool
  }

  constructor(props: any) {
    super(props);
    this.renderLoadingSpinner = this.renderLoadingSpinner.bind(this);
  }

  render() {

    if (this.props.isLoadingPartial) {
      return <TopicDetail {...this.props} />;
    }

    return (
      <div>
        <TopicDetail {...this.props} />
        <ReplyList {...this.props} />
        { this.renderLoadingSpinner() }
        <div style={{height: 46}}></div>
        <ReplyActionBar {...this.props} />
      </div>
    );
  }

  renderLoadingSpinner(): any {
    const { entities, reply, match: { params } } = this.props;
    const topic = entities.topics[params.topicId];

    if (typeof topic === 'undefined') {
      return;
    }

    if (topic['replies_count'] > reply.items.length) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }
  }
}

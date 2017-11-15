import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import TopicListItem from './topic-list-item';
import SpinnerCircle from '../shared/spinner-circle';

export default class TopicList extends React.Component<any, any> {

  static propTypes = {
    entities: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired
  }

  constructor(props: any) {
    super(props);
    this.renderTopicItems = this.renderTopicItems.bind(this);
  }

  renderTopicItems() {
    const { topic, entities } = this.props;

    if (topic.items.length === 0) {
      return;
    }

    return topic.items.map((topicId: any, i: any) => {
      const topic = entities.topics[topicId];
      const user = entities.users[topic.user];

      return <TopicListItem {...this.props}
        key={topicId + '-' + i}
        topic={topic}
        user={user}
      />;
    });
  }

  render() {
    return (
      <div>
        { this.renderTopicItems() }
      </div>
    );
  }
}



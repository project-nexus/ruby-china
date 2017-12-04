import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import TopicListItem from './TopicListItem';
import SpinnerCircle from './SpinnerCircle';

interface TopicListProps {
  entities: Object
}

const TopicList: React.SFC<TopicListProps> = (props) => {

  const topics: string[] = [];

  return topics.map(topicId => {
    const topic = entities.topics[topicId];
    const user = entities.users[topic.user];

    return <TopicListItem key={topicId} topic={topic} user={user} />
  });
}

export default TopicList;

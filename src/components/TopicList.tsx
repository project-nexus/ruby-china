import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import TopicListItem from './TopicListItem';
import SpinnerCircle from './SpinnerCircle';

interface TopicListProps {
  entities: any 
}

const TopicList: React.SFC<TopicListProps> = ({entities}) => {

  const topics: string[] = [];

  return (
    <div>
      {
        topics.map(topicId => {
          const topic = entities.topics[topicId];
          const user = entities.users[topic.user];

          return <TopicListItem key={topicId} topic={topic} user={user} />
        })
      }
    </div>
  )
}

export default TopicList;

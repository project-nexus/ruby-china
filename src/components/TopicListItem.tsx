import * as React from 'react';
import {withRouter} from 'react-router-dom';
import Avatar from './Avatar';



class TopicListItem extends React.PureComponent<TopicListItemProps, any> {

  constructor(props: TopicListItemProps) {
    super(props);
  }

  style() {

    return {

    };
  }

  handleClick() {

  }

  render() {

    return (
      <div></div>
    );
  }
}



interface TopicListItemProps {
  topic: any
  user: any
  type?: any
}

export default TopicListItem;

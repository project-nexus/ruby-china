import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import SpinnerCircle from '../shared/spinner-circle';
import './profile-list.css';

export default class ProfileTopicList extends React.Component<any, any> {

  static propTypes = {
    entities: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props: any) {
    super(props);
    this.renderTopicList = this.renderTopicList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderTopicList() {

    const { user : { topics }, entities } = this.props;

    if (typeof topics === 'undefined' || topics.length === 0) {
      return <div>没有话题</div>;
    }

    return topics.map((topicId: any) => {
      const topic = entities.topics[topicId];

      return (
        <div className="profileListItemContainer" key={`ProfileTopicList-${topicId}`}>

          <Link to={`/topics/${topic.id}`}>
            <div className="profileListItemTitle">
              { topic.title }
            </div>
          </Link>

          <div className="profileListItemInfo">
            <span className="profileListItemNode">{topic.node_name}</span>
            <span className="profileListItemAggregation">{`${topic.likes_count}个赞•${topic.replies_count}条回复`}</span>
          </div>
        </div>
      );
    })
  }

  renderSpinner(): any {
    if (this.props.isLoadingMore) {
      return <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
    }
  }

  render() {
    return (
      <div className="profileListContainer">
        { this.renderTopicList() }
        { this.renderSpinner() }
      </div>
    )
  }
}


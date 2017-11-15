import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import SpinnerCircle from '../shared/spinner-circle';
import './profile-list.css';

export default class ProfileReplyList extends React.Component<any, any> {

  static propTypes = {
    user: PropTypes.object.isRequired,
    entities: PropTypes.object.isRequired
  }

  constructor(props: any) {
    super(props);
    this.renderReplyList = this.renderReplyList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderReplyList() {

    const { user: { replies }, entities } = this.props;

    if (typeof replies === 'undefined' || replies.length === 0) {
      return <div>没有回复</div>;
    }

    return replies.map((replyId: any) => {
      const reply = entities.replies[replyId];

      return (
        <div key={`ProfileReplyList-${replyId}`} className="profileListItemContainer">
          <Link to={`/topics/${reply.topic_id}`}>
            <div className="profileListItemTitle">
              {reply.topic_title}
              </div>
          </Link>
          <div dangerouslySetInnerHTML={{__html: reply.body_html}}></div>
        </div>
      )
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
        { this.renderReplyList() }
        { this.renderSpinner() }
      </div>
    );
  }
}

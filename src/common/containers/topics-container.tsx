import * as React from 'react';
import { connect } from 'react-redux';
import TopicList from '../components/topics-container/topic-list';
import SpinnerCircle from '../components/shared/spinner-circle';
import { getTopics } from '../actions/topic';
import { detectScrollEnd } from '../lib/scroll';

class TopicsContainer extends React.Component<any, any> {

  static fetchData: any;

  constructor(props: any) {

    super(props);
    this.loadMoreTopics = this.loadMoreTopics.bind(this);

    this.state = {
      isLoading: false,
      isLoadingMore: false
    }
  }

  componentDidMount() {

    const { dispatch, topic, application } = this.props;

    document.addEventListener('scroll', this.loadMoreTopics, false);
    document.addEventListener('touchMove', this.loadMoreTopics, false);

    window.scrollTo(0, application.position);

    if (topic.items.length <= 10) {
      TopicsContainer.fetchData(dispatch)
        .then((res: any) => {
          if (res && res.error) {
            this.setState({ error: res.error });
          }
        });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreTopics);
    document.removeEventListener('touchMove', this.loadMoreTopics);
  }

  loadMoreTopics() {
    if (detectScrollEnd() && (this.state.isLoadingMore === false)) {
      const { dispatch, topic } = this.props;
      this.setState({ isLoadingMore: true });
      return dispatch(getTopics(topic.items.length))
        .then(() => this.setState({ isLoadingMore: false }));
    }
  }

  render() {
    const { topic } = this.props;

    if (topic.items.length <= 10) {
      return <SpinnerCircle width={30} />;
    }

    return (
      <div>
        <TopicList {...this.props} />
        <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} />
      </div>
    );
  }
}

TopicsContainer.fetchData = (dispatch: any) => {
  return dispatch(getTopics())
};

function mapStateToProps(state: any) {

  const { entities, topic, application } = state;
  return {
    topic,
    entities,
    application
  }
}

export default connect(mapStateToProps)(TopicsContainer);

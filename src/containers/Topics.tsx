import * as React from 'react';
import {connect} from 'react-redux';
import pullToRefresh from '../hoc/pullToRefresh';

const topicItem = {
  height: 80,
  display: 'flex'
}

const DummyTopicList = () => (
  <div>
    {Array.from(Array(20).keys()).map((index) => (
      <div key={`key-${index}`} style={topicItem}>
        <h1>Topic item, index: {index}</h1>
      </div>
    ))}
  </div>
)

// TopicsContainer is responsible for home page (path: /)
class TopicsContainer extends React.Component<any, any> {

  // pagination
  // tab
  // loading
  constructor(props: any) {
    super(props);

    this.state = {
      pagination: {
        offset: 0,
        limit: 20
      },
      topicsTypes: [
        {
          apiType: '',
        }
      ],
      isLoading: false,
      isLoadingMore: false,
      lastTouch: null,
      detlaY: 0
    }

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div id="list">
          <div className="pullToRefresh"></div>
          <DummyTopicList />
        </div>
      </div>
    )
  }
}

export default connect()(TopicsContainer);



import * as React from 'react';
import {connect} from 'react-redux';

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

const MAX_PULL_TO_REFRESH = 100;

// TopicsContainer is responsible for home page (path: /)
class TopicsContainer extends React.PureComponent<any, any> {

  topicsRef: any
  pullToRefreshLoading: any

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

    this.topicsRef = null;
  }

  handleTouch(e: TouchEvent) {
    if (window.pageYOffset === 0 && this.state.lastTouch)  {
      const touch = e.touches[0];
      const detlaY = touch.screenY - this.state.lastTouch.screenY;
      if (detlaY > 0) {
        e.preventDefault();
        const maringTop = `${(detlaY > MAX_PULL_TO_REFRESH ? MAX_PULL_TO_REFRESH : detlaY) - 60}px`;
        console.log(maringTop);
        this.setState({detlaY});
        this.pullToRefreshLoading.style.marginTop = maringTop;
      }
    }
  }

  handleTouchStart(e: TouchEvent) {
    this.setState({lastTouch: e.touches[0]})
  }

  handleTouchEnd(e: TouchEvent) {
    this.pullToRefreshLoading.style.marginTop = '-60px';
    if (this.state.detlaY > MAX_PULL_TO_REFRESH) {
      this.triggerRefresh();
    }
    this.setState({
      lastTouch: null,
      detlaY: 0
    });
  }

  triggerRefresh() {
    console.log('triggerRefresh');
  }

  componentDidMount() {
    const options: any = {passive: false, capture: false};
    document.addEventListener('touchstart', (e: any) => this.handleTouchStart(e), false);
    document.addEventListener('touchmove', (e: any) => this.handleTouch(e), options);
    document.addEventListener('touchend', (e: any) => this.handleTouchEnd(e), false);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <div id="pullToRefreshLoading" className="pullToRefreshLoading" ref={(dom) => this.pullToRefreshLoading = dom}></div>
        <div id="list">
          <div className="pullToRefresh"></div>
          <DummyTopicList />
        </div>
      </div>
    )
  }
}

export default connect()(TopicsContainer);



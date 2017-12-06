import * as React from 'react';
import config from '../config';

/*
  This HOC is only used for container, don't hook it to normal component
 */
export default function withPullToRefresh(component: React.Component, dispatch: Function, action: string) {

  return class extends React.PureComponent<null, PullToRefreshState> {

    dom: any

    constructor(props: any) {
      super(props);

      this.state = {
        lastTouch: null,
        detlaY: 0
      }
    }

    handleTouchStart(e: React.TouchEvent<Element>) {
      this.setState({lastTouch: e.touches[0]});
    }

    handleTouchMove(e: React.TouchEvent<Element>) {
      if (window.pageYOffset === 0 && this.state.lastTouch)  {
        const touch = e.touches[0];
        const detlaY = touch.screenY - this.state.lastTouch.screenY;
        if (detlaY > 0) {
          e.preventDefault();
          const maringTop = `${(detlaY > config.MAX_PULL_TO_REFRESH ? config.MAX_PULL_TO_REFRESH : detlaY) - 60}px`;
          console.log(maringTop);
          this.setState({detlaY});
          this.dom.style.marginTop = maringTop;
        }
      }
    }

    handleTouchEnd(e: React.TouchEvent<Element>) {
      this.dom.style.marginTop = '-60px';
      if (this.state.detlaY > config.MAX_PULL_TO_REFRESH) {
        dispatch(action);
      }
      this.setState({
        lastTouch: null,
        detlaY: 0
      });
    }

    componentDidMount() {
      const options: any = {passive: false, capture: false};
      document.addEventListener('touchstart', (e: any) => this.handleTouchStart(e), false);
      document.addEventListener('touchmove', (e: any) => this.handleTouchMove(e), options);
      document.addEventListener('touchend', (e: any) => this.handleTouchEnd(e), false);
    }

    componentWillUnmount() {
      document.removeEventListener('touchstart', (e: any) => this.handleTouchStart(e));
      document.removeEventListener('touchmove', (e: any) => this.handleTouchMove(e));
      document.removeEventListener('touchend', (e: any) => this.handleTouchEnd(e));
    }

    render() {
      return (
        <div>
          <div className="pullToRefreshLoading" ref={(dom) => this.dom = dom}></div>
          {component}
        </div>
      );
    }
  }
}

interface PullToRefreshState {
  lastTouch: any
  detlaY: number
}
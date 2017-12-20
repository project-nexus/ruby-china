import * as React from 'react';
import config from '../config';

/*
  This HOC is only used for container, don't hook it to normal component
 */
export default function withPullToRefresh(WrappedComponent: any, dispatch?: Function, action?: string) {

  return class extends React.PureComponent<any, PullToRefreshState> {

    dom: any

    constructor(props: any) {
      super(props);

      this.state = {
        lastTouch: null,
        detlaY: 0
      }
    }

    handleTouchStart(e: any) {
      this.handleMouseDown(e.touches[0]);
    }

    handleTouchMove(e: any) {
      this.handleMouseMove(e.touches[0]);
    }

    handleTouchEnd(e: any) {
      this.handleMouseUp(e);
    }

    handleMouseDown(e: any) {
      this.setState({lastTouch: e});
    }

    handleMouseMove(e: any) {
      if (window.pageYOffset === 0 && this.state.lastTouch)  {
        const touch = e;
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

    handleMouseUp(e: any) {
      this.dom.style.marginTop = '-60px';
      if (this.state.detlaY > config.MAX_PULL_TO_REFRESH) {
        if (dispatch && action) {
          dispatch(action);
        }
      }
      this.setState({
        lastTouch: null,
        detlaY: 0
      });
    }

    componentDidMount() {
      const options: any = {passive: false, capture: false};
      document.addEventListener('touchstart', e => this.handleTouchStart(e), false);
      document.addEventListener('touchmove', e => this.handleTouchMove(e), options);
      document.addEventListener('touchend', e => this.handleTouchEnd(e), false);
      document.addEventListener('mousedown', e => this.handleMouseDown(e), false);
      document.addEventListener('mousemove', e => this.handleMouseMove(e), false);
      document.addEventListener('mouseup', e => this.handleMouseUp(e), false);
    }

    componentWillUnmount() {
      document.removeEventListener('touchstart', e => this.handleTouchStart(e));
      document.removeEventListener('touchmove', e => this.handleTouchMove(e));
      document.removeEventListener('touchend', e => this.handleTouchEnd(e));
      document.removeEventListener('mousedown', e => this.handleMouseDown(e));
      document.removeEventListener('mousemove', e => this.handleMouseMove(e));
      document.removeEventListener('mouseup', e => this.handleMouseUp(e));
    }

    render() {
      return (
        <div>
          <div className="pullToRefreshLoading" ref={(dom) => this.dom = dom}>
            <i className="fa fa-long-arrow-down" aria-hidden="true"></i>
          </div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
}

interface PullToRefreshState {
  lastTouch: any
  detlaY: number
}
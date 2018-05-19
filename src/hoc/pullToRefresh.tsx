import * as React from 'react';
import config from '../config';

/*
  This HOC is only used for container, don't hook it to normal component
 */
export default function withPullToRefresh(WrappedComponent: any, action: Function) {

  return class extends React.PureComponent<any, PullToRefreshState> {

    constructor(props: any) {
      super(props);

      this.state = {
        lastTouch: null,
        detlaY: 0,
        marginTop: -40,
        isLoading: false
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
          const body = document.querySelector('body');
          const marginTop = (detlaY > config.MAX_PULL_TO_REFRESH ? config.MAX_PULL_TO_REFRESH : detlaY) - 60;
          // document.querySelector('body')!.style.overflow = 'hidden';
          this.setState({marginTop})
          this.setState({detlaY, marginTop});
        }
      }
    }

    handleMouseUp(e: any) {
      if (this.state.detlaY > config.MAX_PULL_TO_REFRESH) {
        const { dispatch } = this.props;
        this.setState({isLoading: true});
        dispatch(action()).then(() => {
          this.setState({
            isLoading: false
          })
        });
      }
      this.setState({
        lastTouch: null,
        detlaY: 0,
        marginTop: -60
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
      // document.querySelector('body')!.style.overflow = 'unset';
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
          <div className="pullToRefreshLoading" style={{marginTop: this.state.isLoading ? config.MAX_PULL_TO_REFRESH+'px' : this.state.marginTop+"px"}}>
            <i className={`icon ion-md-refresh ${this.state.isLoading ? 'loading' : null}`} style={{transform: this.state.marginTop > 0 ? `rotate(${this.state.marginTop*9}deg)` : "rotate(0deg)"}}></i>
          </div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
}

interface PullToRefreshState {
  lastTouch: any
  detlaY: number,
  marginTop: number,
  isLoading: boolean
}
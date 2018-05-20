import * as React from 'react';
import config from '../config';

/*
  This HOC is only used for container, don't hook it to normal component
 */
export default function withPullToRefresh(WrappedComponent: any, action: Function) {

  return class extends React.PureComponent<any, PullToRefreshState> {

    constructor(props: any) {
      super(props);

      this.handleTouchStart = this.handleTouchStart.bind(this);
      this.handleTouchMove = this.handleTouchMove.bind(this);
      this.handleTouchEnd = this.handleTouchEnd.bind(this);

      this.handleMouseDown = this.handleMouseDown.bind(this);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);

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
      document.addEventListener('touchstart', this.handleTouchStart, false);
      document.addEventListener('touchmove', this.handleTouchMove, options);
      document.addEventListener('touchend', this.handleTouchEnd, false);
      document.addEventListener('mousedown', this.handleMouseDown, false);
      document.addEventListener('mousemove', this.handleMouseMove, false);
      document.addEventListener('mouseup', this.handleMouseUp, false);
    }

    componentWillUnmount() {
      const options: any = {passive: false, capture: false};
      document.removeEventListener('touchstart', this.handleTouchStart);
      document.removeEventListener('touchmove', this.handleTouchMove, options);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {
      return (
        <div>
          <div className="pullToRefreshLoading" style={{marginTop: this.state.isLoading ? '8px' : this.state.marginTop+"px"}}>
              <i className={`icon ion-md-refresh ${this.state.isLoading ? 'loading' : null}`} style={{transform: this.state.marginTop > -20 ? `rotate(${(this.state.marginTop+20)*6}deg)` : "rotate(0deg)"}}></i>
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
import * as React from 'react';
import * as _ from 'lodash';
import LoadingCircle from '../common/components/shared/spinner-circle';
import './pull-to-refresh.css';


 const DEFAULT_SPINNER_SIZE = 38;
 const DEFAULT_PULL_DOWN_DISTANCE = DEFAULT_SPINNER_SIZE + 50;

/*
  This HOC is only used for container, don't hook it to normal component
 */
export default function withPullToRefresh(WrappedComponent: any, action: Function) {

  return class extends React.PureComponent<PullToRefreshProps, PullToRefreshState> {

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
        isLoading: true,
        isDrag: false
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
      if (!this.state.isLoading) {
        this.setState({lastTouch: e});
      }
    }

    handleMouseMove(e: any) {
      if (window.pageYOffset === 0 && this.state.lastTouch)  {
        const touch = e;
        const detlaY = touch.screenY - this.state.lastTouch.screenY;
        if (detlaY > 0) {
          document.body.style.overflow = 'hidden';
          this.setState({detlaY});
        }
      }
    }

    handleMouseUp(e: any) {
      if (this.state.detlaY > this.getPullDownDistance()) {
        const { dispatch } = this.props as any;
        this.setState({isLoading: true});
        dispatch(action()).then(() => {
          this.resetOverflow();
          this.resetState();
        }).catch((e: any) => {
          console.log(e);
          this.resetOverflow();
          this.resetState();
        })
      } else {
        this.resetOverflow();
        this.resetState();
      }
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
      this.resetOverflow();
      const options: any = {passive: false, capture: false};
      document.removeEventListener('touchstart', this.handleTouchStart);
      document.removeEventListener('touchmove', this.handleTouchMove, options);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('mousedown', this.handleMouseDown);
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    }

    render() {

      const { detlaY, isLoading } = this.state;
      const pullDownDistance = detlaY > this.getPullDownDistance() ? this.getPullDownDistance() : detlaY;
      const marginTop = pullDownDistance - this.getSpinnerSize();
      const step = 1.0/(this.getPullDownDistance()/1.1);

      return (
        <div className="pullToRefreshContainer">
          <div className="pullToRefreshLoading" style={{marginTop: isLoading ? `${marginTop-30}px` : `${marginTop}px`}}>
            <div className="spinner-container">
              { 
                this.state.isLoading ? 
                <LoadingCircle width={20} /> :
                <i className='icon ion-md-refresh' style={{transform: `rotate(${marginTop*6}deg)`, opacity: pullDownDistance*step, color: '#1976D2'}}></i>
              }
            </div>
          </div>

          <WrappedComponent {...this.props} />
        </div>
      );
    }

    private getSpinnerSize(): number {
      return this.props.size ? this.props.size : DEFAULT_SPINNER_SIZE;
    }

    private getPullDownDistance() {
      return this.props.pullDownDistance ? this.props.pullDownDistance : DEFAULT_PULL_DOWN_DISTANCE;
    }

    private resetOverflow() {
      document.body.style.overflow = 'visible';
    }

    private resetState() {
      this.setState({
        lastTouch: null,
        detlaY: 0,
        isLoading: false
      });
    }
  }
}

interface PullToRefreshState {
  lastTouch: any
  detlaY: number,
  isLoading: boolean,
  isDrag: boolean
}

interface PullToRefreshProps {
  size?: number,
  pullDownDistance?: number,
  loadingDistance?: number
}
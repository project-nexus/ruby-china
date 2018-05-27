import * as React from 'react';
import { connect } from 'react-redux';

import { authenticatedAction } from '../lib/util';
import { detectScrollEnd } from '../lib/scroll';
import { fetchNotifications } from '../actions/notification';
import NotificationList from '../components/notification-container/notification-list';
import SpinnerCircle from '../components/shared/spinner-circle';
import withAuthenticatedRoute from '../../hoc/authenticatedRoute';

class NotificationsContainer extends React.Component<any, any> {

  constructor(props: any) {

    super(props);
    this.loadMoreNotifications = this.loadMoreNotifications.bind(this);

    this.state = {
      isLoading: false,
      isLoadingMore: false
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    document.addEventListener('scroll', this.loadMoreNotifications, false);
    document.addEventListener('touchmove', this.loadMoreNotifications, false);

    window.scrollTo(0, 0);
    this.setState({ isLoading: true });

    // authenticatedAction(dispatch, () => {
    //   dispatch(fetchNotifications()).then(() => {
    //     this.setState({ isLoading: false });
    //   });
    // });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.loadMoreNotifications);
    document.removeEventListener('touchMove', this.loadMoreNotifications);
  }

  loadMoreNotifications() {

    if (detectScrollEnd() && this.state.isLoadingMore === false) {

      const { notification, dispatch } = this.props;

      console.log(notification);

      this.setState({ isLoadingMore: true });
      // authenticatedAction(dispatch, () => {
      //   dispatch(fetchNotifications(notification.items.length)).then(() => {
      //     this.setState({ isLoadingMore: false });
      //   });
      // });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SpinnerCircle width={30} />;
    }

    return (
      <div>
        <NotificationList {...this.props} />
        { this.state.isLoadingMore ? <SpinnerCircle width={30} color={"rgb(102, 117, 127)"} /> : null }
      </div>
    );
  }
}

function mapStateToProps(state: any) {

  const { entities, notification, user, topic, reply } = state;
  return {
    notification,
    user,
    topic,
    reply,
    entities
  }
}

export default connect(mapStateToProps)(withAuthenticatedRoute(NotificationsContainer, '/login'));

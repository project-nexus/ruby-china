import * as React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import TopicsContainer from '../containers/topics-container';
import NotificationsContainer from '../containers/notifications-container';
import TopicContainer from '../containers/topic-container';
import LoginContainer from '../containers/login-container';
import ProfileContainer from '../containers/profile-container';
import NavigationBar from '../components/app/navigation-bar';

const App = (props) => (
  <Router>
    <div>
      <div className="container">
        <NavigationBar {...this.props} />
        {this.props.children}
      </div>

      <Route exact path="/" component={TopicsContainer} />
      <Route path="/me" component={ProfileContainer} />
      <Route path="/notifications" component={NotificationsContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/topics/:topicId" component={TopicContainer} />
      <Route path="/:username" component={ProfileContainer} />
    </div>
  </Router>
)

export default connect()(App);


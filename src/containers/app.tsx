import * as React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavigationBar from '../common/components/app/navigation-bar';
import TopicsContainer from '../common/containers/topics-container';
import TopicContainer from '../common/containers/topic-container';
import ProfileContainer from '../common/containers/profile-container';
import LoginContainer from '../common/containers/login-container';
import NotificationsContainer from '../common/containers/notifications-container';
import TestContainer from './Topics';
import '../assets/global.css';

export default (props: any) => (
  <Router>
    <div className="container">
      <div className="wrapper">
        <NavigationBar {...props} />
        {props.children}

        <Route exact path="/" component={TopicsContainer} />
        <Route path="/me" component={ProfileContainer} />
        <Route path="/notifications" component={NotificationsContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/topics/:topicId" component={TopicContainer} />
        <Route path="/test" component={TestContainer} />
        <Route path="/:username" component={ProfileContainer} />
      </div>
    </div>
  </Router>
)
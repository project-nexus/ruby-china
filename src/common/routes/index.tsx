import * as React from 'react';
// import { Router, Route, IndexRoute } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from '../containers/app';
import TopicsContainer from '../containers/topics-container';
import NotificationsContainer from '../containers/notifications-container';
import TopicContainer from '../containers/topic-container';
import LoginContainer from '../containers/login-container';
import ProfileContainer from '../containers/profile-container';

export default () => (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="me" component={ProfileContainer} />
    <Route path="notifications" component={NotificationsContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="topics/:topicId" component={TopicContainer} />
    <Route path=":username" component={ProfileContainer} />
  </Router>
);


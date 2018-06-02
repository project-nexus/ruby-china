import * as React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import NavigationBar from '../common/components/app/navigation-bar';
import TopicsContainer from '../common/containers/topics-container';
import TopicContainer from '../common/containers/topic-container';
import ProfileContainer from '../common/containers/profile-container';
import LoginContainer from '../common/containers/login-container';
import NotificationsContainer from '../common/containers/notifications-container';
import TestContainer from './Topics';
import withAuthenticatedRoute from '../hoc/authenticatedRoute';
import GlobalLoading from '../components/GlobalLoading';
import '../assets/global.css';

const AuthenticatePath = '/login';

class App extends React.PureComponent {

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="wrapper">

            <NavigationBar {...this.props} />
            {this.props.children}

            <Switch>
              <Route exact path="/" component={TopicsContainer} />
              <Route exact path="/me" component={withAuthenticatedRoute(ProfileContainer, AuthenticatePath)} />
              <Route exact path="/notifications" component={NotificationsContainer} />
              <Route exact path="/login" component={LoginContainer} />
              <Route exact path="/topics/:topicId" component={TopicContainer} />
              <Route exact path="/test" component={TestContainer} />
              <Route exact path="/:username" component={ProfileContainer} />
            </Switch>

            <GlobalLoading />
          </div>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state: any) {
  return {
  }
}

export default connect(mapStateToProps)(App);
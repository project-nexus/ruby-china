import * as React from 'react';
import { connect } from 'react-redux';

import Login from '../components/login-container/login';
import { getTopics } from '../actions/topic';

class LoginContainer extends React.Component<any, any> {

  static fetchData = (dispatch: any) => {
    return dispatch(getTopics());
  }

  componentDidMount() {
    const { dispatch } = this.props;

    LoginContainer.fetchData(dispatch);
  }

  render() {
    return <Login {...this.props} />;
  }
}

function mapStateToProps(state: any) {

  const { entities, application } = state;
  return {
    entities,
    application
  }
}

export default connect(mapStateToProps)(LoginContainer);


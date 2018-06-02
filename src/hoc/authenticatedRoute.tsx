import * as React from 'react';
import { Redirect } from 'react-router'
import adapter from '../adapters/RubyChinaAdapter';
import {appStartLoading, appStopLoading} from '../common/actions/application'

export default function withAuthenticatedRoute(WrappedComponent: any, authenticatePath: string) {
  return class extends React.PureComponent<any, any> {

    state = {
      redirect: false,
      isLoading: true
    };

    async componentDidMount() {
      const {dispatch} = this.props;
      dispatch(appStartLoading())
      try {
        await adapter.getToken();
      } catch (e) {
        console.log(e);
      }     
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect push to={authenticatePath} />
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}
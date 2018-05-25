import * as React from 'react';
import { Redirect } from 'react-router'
import adapter from '../adapters/RubyChinaAdapter';

export default function withAuthenticatedRoute(WrappedComponent: any, authenticatePath: string, authenticateActions: string[]) {
  return class extends React.PureComponent<any, any> {

    // state = {
    //   redirect: false,
    //   isLoading: true
    // };

    // async componentDidMount() {
    //   try {
    //     await adapter.getToken();
    //   } catch (e) {
    //     console.log(e);
    //     this.setState({redirect: true});
    //   } finally {
    //     this.setState({isLoading: false});
    //   }
    // }

    // render() {
    //   const { redirect } = this.state;
    //   if (redirect) {
    //     return <Redirect push to={authenticatePath} />
    //   }
    //   return <WrappedComponent {...this.props} />;
    // }
  }
}
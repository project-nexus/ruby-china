'use strict';

import * as React from 'react';
import * as PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationBar from '../components/app/navigation-bar';
import '../assets/stylesheets/global.css';

// injectTapEventPlugin();

class App extends React.Component<any, any> {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <div>
          <div className="container">
            <NavigationBar {...this.props} />
            {this.props.children}
          </div>
        </div>
    );
  }
}

export default connect()(App);

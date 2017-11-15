'use strict';

import React, {
  Component
} from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationBar from '../components/app/navigation-bar';
import '../assets/stylesheets/global.css';

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(App);

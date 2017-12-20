import * as React from 'react';
import {Provider} from 'react-redux';
import * as ReactDOM from 'react-dom';

import store from './store';
import App from './containers/App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);


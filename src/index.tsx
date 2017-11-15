import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';

import createStore from './common/store';
import routes from './common/routes';

const store = createStore();
const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    { routes() }
  </Provider>,
  rootElement
);


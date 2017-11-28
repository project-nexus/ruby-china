import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../common/reducers';

const middlewares = [ thunk ];
export default applyMiddleware(...middlewares)(createStore)(reducers);


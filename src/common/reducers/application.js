'use strict';

import * as actionTypes from '../constants/action-types';

const initialState = {
  position: 0,
  token: '',
  currentUser: {},
  isLoading: false
};

export default function applicationReducer(state = initialState, action) {
  switch(action.type) {

    case actionTypes.TRACK_SCROLL_POSITION:
      return Object.assign({}, state, {
        position: action.position
      });

    case actionTypes.GET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.user
      });

    case actionTypes.APP_START_LOADING:
      return Object.assign({}, state, {
        isLoading: true
      });

    case actionTypes.APP_STOP_LOADING:
      return Object.assign({}, state, {
        isLoading: false
      });
 
    default:
      return state;
  }
}
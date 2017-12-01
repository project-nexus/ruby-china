import * as types from './ActionTypes';

export function initialize() {
}

export function fetchCurrentUser() {
}

export function trackScrollPosition(scrollPosition: number) {
  return {
    type: types.TRACK_SCROLL_POSITION,
    position: scrollPosition
  }
}




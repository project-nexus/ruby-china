import * as types from './ActionTypes';
import adapter from '../adapters/RubyChinaAdapter';

export function initialize() {
}

export function fetchCurrentUser() {
}

export async function getToken(username?: string, password?: string) {
  adapter.getToken()
}

export function trackScrollPosition(scrollPosition: number) {
  return {
    type: types.TRACK_SCROLL_POSITION,
    position: scrollPosition
  }
}




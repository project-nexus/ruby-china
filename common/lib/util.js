'use strict';

import { browserHistory } from 'react-router';
import { refreshAccessToken } from '../actions/application';

export function timeSince(date) {
  const seconds = Math.floor((new Date()) - date) / 1000;

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return `${interval} years`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} months`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours`;
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes`;
  }

  return `${Math.floor(seconds)} seconds`;
}

export function toCamel(str) {
  return str.replace(/(_[a-z])/g, ($1) => $1.toUpperCase().replace('_', ''));
}

export function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

export function getToken() {
  return ['username', 'accessToken', 'refreshToken', 'expiresAt'].reduce((result, current) => {
    if ( typeof localStorage !== 'undefined' && localStorage.getItem(current)) {
      result[current] = localStorage.getItem(current);
    } else {
      result[current] = "";
    }
    return result;
  }, {});
}

export function saveToken(data, username) {
  if ( username && username.length > 0 ) {
    localStorage.setItem('username', username);
  }
  localStorage.setItem('accessToken', data.access_token);
  localStorage.setItem('refreshToken', data.refresh_token);
  localStorage.setItem('expiresAt', (data.expires_in + data.created_at) * 1000);
}

export function isLoginOrRedirect() {
  const { username, accessToken } = getToken();
  if (accessToken.length === 0 || username.length === 0) {
    browserHistory.push(`/login?next=${window.location.pathname}`);
    return false;
  }
}

export function isValidLoginOrRedirect() {
  const { username, accessToken, expiresAt } = getToken();

  if (accessToken.length > 0 && username.length > 0) {
    return Date.now() < expiresAt - 5 * 60 * 1000;
  } else {
    browserHistory.push(`/login?next=${window.location.pathname}`);
    return false;
  }
}

export function authenticatedAction(dispatch, action) {
  if (!isValidLoginOrRedirect()) {
    dispatch(refreshAccessToken())
      .then( result => {
        if (!result.error) {
          action();
        }
      })
  } else {
    action();
  }
}


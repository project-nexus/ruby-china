import * as types from '../common/constants/action-types';
import axios from 'axios';
import { normalize, arrayOf } from 'normalizr';

import address from '../lib/address';
import { notificationSchema } from '../constants/schema';

export function fetchNotifications(offset, limit, type) {
  return (dispatch) => {
    return fetch(address.notifications(offset, limit, type))
      .then(res => res.json())
      .then(data => {
        const notifications = data.notifications;
        const normalized = normalize(notifications, arrayOf(notificationSchema));
        dispatch(receiveNotifications(normalized.entities, normalized.result));
      })
      .catch((error) => { return {error: error.message} })
  };
}


function crudUrlForRes(res: string, method: string, offset?: number, limit?: number): string {
  return "";
}

function schemaForRes(res: string) {
  return "";
}


export function fetchPaginatedRes(res: string, offset?: number, limit?: number, options?: any) {
  return async (dispatch: Function) => {
    try {
      const response = await axios.get(crudUrlForRes(res, 'get', offset, limit))
      const resList = response.data[res]
      const normalized = normalize(resList, arrayOf(notificationSchema))
      dispatch()
    } catch (e) {
      console.log(e)
    }
  }
}

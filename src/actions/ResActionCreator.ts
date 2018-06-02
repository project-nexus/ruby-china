import * as types from '../common/constants/action-types';
import axios from 'axios';
import { normalize } from 'normalizr';
import Resource, {ResourceKlass} from '../models/Resource'

function crudUrlForRes(res: string, method: string, offset?: number, limit?: number): string {
  return "";
}

function schemaForRes(res: string) {
  return "";
}

type KResource = {
  new (...args: any[]): Resource
}


export function fetchPaginatedRes(res: ResourceKlass, offset?: number, limit?: number, options?: any) {
  return async (dispatch: Function) => {
    try {
      const response = await axios.get(res.crudUrls('get', offset, limit))
      const resList = response.data[res]
      // const normalized = normalize(resList, arrayOf(notificationSchema))
      dispatch()
    } catch (e) {
      console.log(e)
    }
  }
}

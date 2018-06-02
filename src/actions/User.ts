import * as types from './ActionTypes';
import adapter from '../adapters/RubyChinaAdapter';
import {fetchPaginatedRes} from './ResActionCreator'

export async function getCurrentUser() {
  fetchPaginatedRes()
  const user = await adapter.getCurrentUser();

  return {
    type: types.GET_CURRENT_USER
  }
}

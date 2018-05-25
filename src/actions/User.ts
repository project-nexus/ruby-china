import * as types from './ActionTypes';
import adapter from '../adapters/RubyChinaAdapter';

export async function getCurrentUser() {
  const user = await adapter.getCurrentUser();

  return {
    type: types.GET_CURRENT_USER
  }
}
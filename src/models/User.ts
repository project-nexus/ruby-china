import Resource from "./Resource";
import * as querystring from 'querystring';

export default class User extends Resource {

  static schema() {
  }

  static crudUrls(method: string, offset?: number, limit?: number): string {
    return "/api/v3/users" + '?' + querystring.stringify({offset, limit})
  }
}
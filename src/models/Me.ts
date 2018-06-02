import User from './User'

export default class Me extends User {

  static crudUrls(method: string): string {
    return "/api/v3/me"
  }

}
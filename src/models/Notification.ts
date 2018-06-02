import Resource from "./Resource";

export default class Notification extends Resource {

  static crudUrls(method: string): string {
    return "/api/v3/notifications"
  }

  static schema() {
  }

}
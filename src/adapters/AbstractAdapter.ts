import Token from '../models/Token';

export default interface AbstractAdapter {

  getNotifications(): any;

  getTopics(): any;

  getTopic(): any;

  getReplies(): any;

  getUser(): any;

  getUsers(): any;

  getToken(...args: any[]): Promise<Token>;
}
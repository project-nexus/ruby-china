import axios, {AxiosInstance} from 'axios';
import config from '../config.json';
import Token from '../models/Token';
import AbstractAdapter from './AbstractAdapter';
import * as _ from 'lodash';

class RubyChinaAdapter implements AbstractAdapter {

  private _client: AxiosInstance;
  private _currentToken: Token;

  constructor() {
    this._client = axios.create({
      baseURL: 'https://ruby-china.org/'
    });
  }

  getTopics() {
  }

  getTopic() {
  }

  async getCurrentUser() {
    try {
      const token = await this._requireAuthentication();
      const res = await this._client.get('/api/v3/users/me', {headers: {'Authorization': `Bearer ${(token as Token).accessToken}`}});
      console.log(res.data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  getUsers() {

  }

  getUser() {
  }

  getReplies() {

  }

  getNotifications() {

  }

  getToken: (username?: string, password?: string) => Promise<Token> = _.throttle(async (username: string, password: string) => {

    debugger;

    // no current token, request a new token
    if (typeof this._currentToken === 'undefined') {
      if (username && password) {
        this._currentToken = await this._requestToken(username, password);
      }
      throw 'username and password is required';
    }

    // current token expires, refresh the token
    if (this._currentToken && this._currentToken.expiresAt < Date.now()) {
      this._currentToken = await this._refreshToken(this._currentToken.refreshToken);
    }

    return this._currentToken;
  }, 200);

  private _requestToken(username: string, password: string): Promise<Token> {
    return this._client.post('/auth/token', {
      grant_type: "password",
      client_id: config.RubyChina.client_id,
      client_secret: config.RubyChina.client_secret,
      username,
      password,
    }).then((data: any) => {
      return <Token>{};
    })
  }

  private _refreshToken(token: string): Promise<Token> {
    return this._client.post('/auth/token', {
      grant_type: "refresh_token",
      client_id: config.RubyChina.client_id,
      client_secret: config.RubyChina.client_secret,
      refresh_token: token
    }).then((data: any) => {
      return <Token>{};
    })
  }

  private _checkExpire() {
  }

  // should store in cookie according to: https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
  private _getCurrentToken() {
  }

  private _setCurrentToken() {
  }

  private async _requireAuthentication() {
    if (this._currentToken) {
      if (this._currentToken.expiresAt < Date.now()) {
        return await this._refreshToken(this._currentToken.refreshToken);
      } else {
        return this._currentToken;
      }
    }
    throw 'require login';
  }
}

const adapter = new RubyChinaAdapter();

export default adapter;

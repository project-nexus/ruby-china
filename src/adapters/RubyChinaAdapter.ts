import axios, {AxiosInstance} from 'axios';
import config from '../config';
import Token from '../models/Token';
import AbstractAdapter from './AbstractAdapter';
import * as _ from 'lodash';

class RubyChinaAdapter implements AbstractAdapter {

  private _client: AxiosInstance;
  private _currentToken: Token;

  constructor() {
    this._client = axios.create({
      // baseURL: 'https://ruby-china.org/'
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

  getToken: (username?: string, password?: string) => void = _.throttle(async (username: string, password: string) => {
    // no current token, request a new token
    if (typeof this._currentToken === 'undefined') {
      if (typeof username === 'undefined' || typeof password === 'undefined') {
        throw 'username and password is required';
      }
      this._currentToken = await this._requestToken(username, password);
      return
    }

    // current token expires, refresh the token
    if (this._currentToken && this._currentToken.expiresAt < Date.now()) {
      this._currentToken = await this._refreshToken(this._currentToken.refreshToken);
      return
    }

    return
  }, 200);

  private _requestToken(username: string, password: string): Promise<Token> {
    return this._client.post('/oauth/token', {
      grant_type: "password",
      username,
      password,
    }).then(this._buildToken);
  }

  private _refreshToken(token: string): Promise<Token> {
    return this._client.post('/oauth/token', {
      grant_type: "refresh_token",
      // client_id: config.RubyChina.client_id,
      // client_secret: config.RubyChina.client_secret,
      refresh_token: token
    }).then(this._buildToken);
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

  private _buildToken(res: any): Token {
    const data = res.data;
    return <Token>{
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.created_at + data.expires_in
    }
  }
}

const adapter = new RubyChinaAdapter();

export default adapter;

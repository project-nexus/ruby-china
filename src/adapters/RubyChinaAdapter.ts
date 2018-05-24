import axios, {AxiosInstance} from 'axios';
import config from '../../config.json';
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

  getToken: (username: string, password: string) => Promise<Token> = _.throttle((username: string, password: string) => {
    if (this._currentToken) {
      if (this._currentToken.expiresAt < Date.now()) {
        return this._refreshToken(this._currentToken.refreshToken).then((token: Token) => {
          this._currentToken = token;
          return token;
        }); 
      } else {
        return Promise.resolve(this._currentToken);
      }
    }

    return this._requestToken(username, password).then((token: Token) => {
      this._currentToken = token;
      return token;
    });
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
}
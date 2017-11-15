import * as React from 'react';

import { fetchAccessToken } from '../../actions/application';
import Items from '../../constants/items';
import SpinnerCircle from '../shared/spinner-circle';
import './login.css';

// component 保存着自己的 state, 例如 登录加载, 登录错误
// 好处就是不会污染全局的 state, 不用 state 的清理
// 不增加全局 state 的复杂度
export default class Login extends React.Component<any, any> {

  private password: string;
  private username: string;

  constructor() {
    super({});
    this.state = {
      isSubmitting: false,
      error: "",
      usernameError: "",
      passwordError: ""
    };
  }

  handleSubmit() {
    if (this.state.isSubmitting === false && this.validateParams(this.username || "", this.password || ""))  {
      const { dispatch } = this.props;
      this.setState({ isSubmitting: true });
      dispatch(fetchAccessToken(this.username, this.password))
        .then((res: any) => {

          this.password = "";

          let state: any = { isSubmitting: false };

          if (res && res.error) {
            state.error = res.error;
          }

          this.setState(state);
        });
    }
  }

  validateParams(username: any, password: any) {

    let state = { usernameError: "", passwordError: "" };

    if (username.length === 0) {
      state.usernameError = "用户名或邮箱不能为空";
    }

    if (password.length === 0) {
      state.passwordError = "密码不能为空";
    }

    this.setState(state);
    return !(state.usernameError && state.passwordError);
  }

  handleInput(type: any, e: any) {

    switch (type) {
      case Items.USERNAME:
        this.username = e.target.value;
        if (e.target.value && e.target.value.length > 0) this.setState({ usernameError: "" });
        break;
      case Items.PASSWORD:
        this.password = e.target.value;
        if (e.target.value && e.target.value.length > 0) this.setState({ passwordError: "" });
        break;
    }
  }

  render() {

    return (
      <div className="loginContainer">
        <h1 className="hero">Ruby China</h1>
        <input
          type="text"
          placeholder="用户名或邮箱"
          style={{borderBottomColor: this.state.usernameError.length > 0 ? "#ed4956": null}}
          onChange={this.handleInput.bind(this, Items.USERNAME)}
        />
        <input
          type="password"
          placeholder="密码"
          style={{borderBottomColor: this.state.passwordError.length > 0 ? "#ed4956": null}}
          onChange={this.handleInput.bind(this, Items.PASSWORD)}
        />
        <button className="loginButton" onClick={this.handleSubmit.bind(this)}>
          {
            this.state.isSubmitting ?
              <SpinnerCircle width={26} /> :
              "登录"
          }
        </button>
        <div className="error">
          <p>{ this.state.error }</p>
          <p>{ this.state.usernameError }</p>
          <p>{ this.state.passwordError }</p>
        </div>
      </div>
    );
  }
}
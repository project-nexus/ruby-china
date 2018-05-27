import * as React from 'react';
import { fetchAccessToken } from '../../actions/application';
import Items from '../../constants/items';
import SpinnerCircle from '../shared/spinner-circle';
import './login.css';
import adapter from '../../../adapters/RubyChinaAdapter';

export default class Login extends React.Component<any, any> {

  private password: string;
  private username: string;

  constructor(props: any) {
    super(props);
    this.state = {
      isSubmitting: false,
      error: "",
      usernameError: "",
      passwordError: ""
    };
  }

  async handleSubmit() {
    const {isSubmitting} = this.state;
    if (this.state.isSubmitting === false && this.validateParams(this.username || "", this.password || ""))  {
      const { dispatch } = this.props;
      this.setState({isSubmitting: true});
      await adapter.getToken(this.username, this.password);
      this.setState({isSubmitting: false});
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
              <SpinnerCircle width={20} /> :
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
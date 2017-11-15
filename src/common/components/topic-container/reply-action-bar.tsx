import * as React from 'react';
import { isLoginOrRedirect } from '../../lib/util';
import SpinnerCircle from '../shared/spinner-circle';
import './reply-action-bar.css';

export default class ReplyActionBar extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = { isLoading: false };
  }

  handleReply(e: any) {
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <div className="replyActionBarContainer" onClick={isLoginOrRedirect}>
        <div className="replyHint" contentEditable={true}></div>
        <div className="replyButton" onClick={this.handleReply.bind(this)}>
          {
            this.state.isLoading ?
              <SpinnerCircle width={20} color={'#9E9E9E'} /> :
              "回复"
          }
        </div>
      </div>
    );
  }
}
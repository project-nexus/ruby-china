import * as React from 'react';
import { Link } from 'react-router-dom';
import './navigation-bar.css';

export default class NavigationBar extends React.Component<any, any> {

  renderSubNav(path: any, icon: any, text: any) {
    let classNames = "tabItemContainer";

    // if (this.props.location.pathname === path) {
    //   classNames = `${classNames} selected`
    // }

    return (
      <Link to={path}>
        <div className={classNames}>
              <span>
                <i className={icon} />
                { text }
              </span>
        </div>
      </Link>
    );
  }

  render() {
    return (
      <div className="tabBar">
        { this.renderSubNav.bind(this)("/", "fa fa-comments", "社区") }
        { this.renderSubNav.bind(this)("/notifications", "fa fa-bell", "通知") }
        { this.renderSubNav.bind(this)("/me", "fa fa-user", "我") }
      </div>
    );
  }
}

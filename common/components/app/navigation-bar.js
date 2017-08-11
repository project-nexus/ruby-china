import React from 'react';
import { Link } from 'react-router';
import styles from './navigation-bar.css';

export default class NavigationBar extends React.Component {

  renderSubNav(path, icon, text) {
    let classNames = styles.tabItemContainer;

    if (this.props.location.pathname === path) {
      classNames = `${styles.tabItemContainer} ${styles.selected}`;
    }

    return (
      <Link className={classNames} to={path}>
        <div>
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
      <div className={styles.tabBar}>
        { this.renderSubNav.bind(this)("/", "fa fa-comments", "社区") }
        { this.renderSubNav.bind(this)("/notifications", "fa fa-bell", "通知") }
        { this.renderSubNav.bind(this)("/me", "fa fa-user", "我") }
        <div className={styles.underline}></div>
      </div>
    );
  }
}

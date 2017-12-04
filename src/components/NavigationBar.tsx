import * as React from 'react';
import {Link} from 'react-router-dom';
import * as classNames from 'classnames';
import '../assets/navigation-bar.css';

interface Tab {
  path: string
  icon: string
  text: string
  selected: boolean
}

// const topicsTab = ['/', 'fa fa-comments', '社区'];
// const notificationTab = ['/notification', 'fa fa-bell', '通知'];
// const meTab = ['/me', 'fa fa-user', '我'];
// const tabs = [topicsTab, notificationTab, meTab];

export default (props: {tabs: Array<Tab>}) => {

  const renderSubNav = ({path, icon, text, selected = false}: Tab) => (
    <Link to={path}>
      <div className={classNames('tabItemContainer', {selected})}>
        <span>
          <i className={icon}></i>
          {text}
        </span>
      </div>
    </Link>
  )
    
  return (
    <div className="tabBar">
      {props.tabs.map(renderSubNav)}
    </div>
  )
}

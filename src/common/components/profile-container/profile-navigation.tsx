import * as React from 'react';
import * as PropTypes from 'prop-types'; 
import './profile-navigation.css';

export default class ProfileNavigation extends React.Component<any, any> {

  static propTypes = {
    changeTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.number.isRequired
  }

  render() {

    const { selectedTab, changeTab } = this.props;
    const selectedClass = `profileItem selected`;

    return (
      <div className="profileNavigationContainer">
        <div className={ selectedTab == 0 ? selectedClass : "profileItem" } onClick={changeTab.bind(this, 0)}>
          <div className="profileText">帖子</div>
        </div>

        <div className={ selectedTab == 1 ? selectedClass : "profileItem" } onClick={changeTab.bind(this, 1)}>
          <div className="profileText">回帖</div>
        </div>

        <div className={ selectedTab == 2 ? selectedClass : "profileItem" } onClick={changeTab.bind(this, 2)}>
          <div className="profileText">正在关注</div>
        </div>

        <div className={ selectedTab == 3 ? selectedClass : "profileItem" } onClick={changeTab.bind(this, 3)}>
          <div className="profileText">关注者</div>
        </div>
      </div>
    )
  }
}
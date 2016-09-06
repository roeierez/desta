// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import classNames from 'classnames';

const MainMenu = ({loggedInUser, menuOpened}) => {
    return (
        <div className={classNames({"menu-wrapper": true, "menu-opened": menuOpened})}>
            <div className="main-navigation">
                <IndexLink className="font-icon font-icon-home" activeClassName="active" to="/">Home</IndexLink>
                {loggedInUser && <Link className="font-icon font-icon-user" activeClassName="active" to={`/${loggedInUser.id}/profile/trips`}>My Desta</Link> }
                <Link className="font-icon font-icon-users" activeClassName="active" to="/explore/all">Explore</Link>
                <Link activeClassName="active" to="/about"><i className="fa fa-info" />About us</Link>
                <Link className="font-icon font-icon-phone" activeClassName="active" to="/contact">Contact us</Link>
            </div>
        </div>
    )
};

export default MainMenu;

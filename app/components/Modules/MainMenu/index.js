// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import classNames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {browserHistory} from 'react-router';

let navigate = (route, event) => {
    event.preventDefault();
    browserHistory.push(route);
}
const MainMenu = ({loggedInUser, menuOpened}) => {
    return (
        <div className={classNames({"menu-wrapper": true, "menu-opened": menuOpened})}>
            <div className="main-navigation">
                <IndexLink className="font-icon font-icon-home" activeClassName="active" to="/">
                    <FlatButton
                        label="Home"
                        icon={<FontIcon className="material-icons">home</FontIcon>}
                    />
                </IndexLink>
                {loggedInUser && <Link className="font-icon font-icon-user" activeClassName="active" to={`/${loggedInUser.id}/profile/trips`}>
                    <FlatButton
                        label="My Desta"
                        icon={<FontIcon className="material-icons">person</FontIcon>}
                    />
                </Link> }
                <Link className="font-icon font-icon-users" activeClassName="active" to="/explore/all">
                    <FlatButton
                        label="Explore"
                        icon={<FontIcon className="material-icons">people</FontIcon>}
                    />
                </Link>
                <Link activeClassName="active" to="/about">
                    <FlatButton
                        label="About Us"
                        icon={<FontIcon className="material-icons">info</FontIcon>}
                    />
                </Link>
                <Link className="font-icon font-icon-phone" activeClassName="active" to="/contact">
                    <FlatButton
                        label="Contact Us"
                        icon={<FontIcon className="material-icons">message</FontIcon>}
                    />
                </Link>
            </div>
        </div>
    )
};

export default MainMenu;

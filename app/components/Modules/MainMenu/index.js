// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';

const MainMenu = ({}) => {
    return (
        <div className="main-navigation">
            <IndexLink className="font-icon font-icon-home" activeClassName="active" to="/">Home</IndexLink>
            <Link className="font-icon font-icon-user" activeClassName="active" to="/profile/trips">My Desta</Link>
            <Link className="font-icon font-icon-users" activeClassName="active" to="/explore/past">Explore</Link>
            <Link activeClassName="active" to="/about"><i className="fa fa-info" />About us</Link>
            <Link className="font-icon font-icon-phone" activeClassName="active" to="/contact">Contact us</Link>
        </div>
    )
};

export default MainMenu;

// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';

const Header = ({login, loggedInUser}) => {
    var userPhothURL = loggedInUser ? `https://graph.facebook.com/v2.7/${loggedInUser.id}/picture?type=small&width=45&height=45` : null;
    return (
        <div className="site-header-section">
            <div className="brand">
                <a className="logo" href="#"><span className="logo-desta">Desta</span><span
                    className="logo-travel">Travel</span></a>
            </div>
            <div className="main-navigation">
                <IndexLink activeClassName="active" to="/">Home</IndexLink>
                <Link activeClassName="active" to="/profile">My Desta</Link>
                <Link activeClassName="active" to="/explore">Explore</Link>
                <Link activeClassName="active" to="/about">About us</Link>
                <Link activeClassName="active" to="/contact">Contact us</Link>
            </div>
            <div className="right-navigation">
                <Link className="notifications" to="notifications">
                    <div className="icon-wrapper">
                        <span className="font-icon font-icon-alarm"></span>
                        <span className="label notification-number label-pill label-danger">4</span>
                    </div>
                </Link>
                <Link className="messages" to="messages">
                    <div className="icon-wrapper">
                        <span className="font-icon font-icon-mail"></span>
                        <span className="label notification-number label-pill label-danger">7</span>
                    </div>
                </Link>
                {loggedInUser && <div className="avatar-wrapper"><img className="avatar" src={userPhothURL}/></div>}
                {!loggedInUser &&
                <Link onClick={login} to="login"><span className="font-icon font-icon-lock"></span>Sign in</Link>}
            </div>
        </div>
    )
};

export default Header;

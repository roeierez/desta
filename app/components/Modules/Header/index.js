// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import { Link } from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';

const Header = () => (
    <Navbar className="site-header" fluid={false}>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Desta</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="pills">
            <NavItem><Link to="/createtrip">Home</Link></NavItem>
            <NavItem><Link to="/profile">My Desta</Link></NavItem>
            <NavItem><Link to="/explore">Explore</Link></NavItem>
        </Nav>
        <Nav pullRight={true} bsStyle="pills">
            <NavItem><Link to="/login">Sign in</Link></NavItem>
        </Nav>
    </Navbar>
);

export default Header;

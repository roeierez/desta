// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import { Link } from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';

const Header = () => (
    <Navbar className="site-header" fluid={true}>
        <Row>
            <Col xs={1}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Desta</a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Col>
            <Col xs={4} xsOffset={4}>
                <Nav bsStyle="pills">
                    <NavItem><Link to="/createtrip"><span className="font-icon font-icon-home"></span>Home</Link></NavItem>
                    <NavItem><Link to="/profile"><span className="font-icon font-icon-user"></span>My Desta</Link></NavItem>
                    <NavItem><Link to="/explore"><span className="font-icon font-icon-search"></span>Explore</Link></NavItem>
                </Nav>
            </Col>
            <Nav pullRight={true} bsStyle="pills">
                <NavItem><Link to="login"><span className="font-icon font-icon-lock"></span>Sign in</Link></NavItem>
            </Nav>
        </Row>
    </Navbar>
);

export default Header;

// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import { Link } from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';

const Header = ({login}) => (
    <Navbar className="site-header" fluid={true}>
        <Row>
            <Col fluid={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="logo" href="#"><span className="logo-desta">Desta</span><span className="logo-travel">Travel</span></a>
                    </Navbar.Brand>
                </Navbar.Header>
            </Col>
            <Col fluid={true}>
                <Nav bsStyle="pills">
                    <NavItem><Link activeClassName="active" to="/createtrip"><span className="font-icon font-icon-home"></span>Home</Link></NavItem>
                    <NavItem><Link activeClassName="active" to="/profile"><span className="font-icon font-icon-user"></span>My Desta</Link></NavItem>
                    <NavItem><Link activeClassName="active" to="/explore"><span className="font-icon font-icon-search"></span>Explore</Link></NavItem>
                    <NavItem><Link activeClassName="active" to="/about"><span className="font-icon font-icon-help"></span>About us</Link></NavItem>
                    <NavItem><Link activeClassName="active" to="/contact"><span className="font-icon font-icon-phone"></span>Contact us</Link></NavItem>
                </Nav>
            </Col>
            <Nav className="rightNavBar" pullRight={true} bsStyle="pills">
                <NavItem><Link className="notifications" to="notifications"><span className="font-icon font-icon-alarm"></span>
                    <span className="label notification-number label-pill label-danger">4</span></Link>
                </NavItem>
                <NavItem><Link className="messages" to="messages"><span className="font-icon font-icon-mail"></span>
                    <span className="label notification-number label-pill label-danger">7</span>
                </Link></NavItem>
                <NavItem><Link onClick={login} to="login"><span className="font-icon font-icon-lock"></span>Sign in</Link></NavItem>
            </Nav>
        </Row>
    </Navbar>
);

export default Header;

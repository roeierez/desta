// Simple header component

import '../../../resources/styles/main.less';
import React ,{PropTypes } from 'react';
import ReactDom from 'react-dom';
import {PlacesAutocompleteInput} from 'components/Modules/Form';
import {Link, IndexLink} from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MessageNotificationsIcon from 'material-ui/svg-icons/communication/message';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {browserHistory} from 'react-router';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {blue500, red500, green500} from 'material-ui/styles/colors';
import Avatar from 'components/Modules/Avatar';


class Header extends React.Component {

    static propTypes = {
        login: PropTypes.func,
        logout: PropTypes.func,
        showNewTripForm: PropTypes.func,
        newTripFormVisible: PropTypes.bool,
        toggleMenu: PropTypes.func,
        selectLocation: PropTypes.func,
        loggedInUser: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {placeHolderVisible: true};
    }

    onSearchClicked () {
        ReactDom.findDOMNode(this.refs.autoComplete).querySelector('input').focus();
    }

    onAutocompleteBlur() {
        let value = ReactDom.findDOMNode(this.refs.autoComplete).querySelector('input').value;

        this.setState({'placeHolderVisible': value == null || value == ""});
    }

    onAutocompleteFocus(){
        this.setState({'placeHolderVisible': false});
    }

    renderLinks (pageLinks) {
        return (
            <div className="page-links">
                {pageLinks.map(pl => <Link activeClassName="active" to={pl.to}>{pl.label}</Link>)}
            </div>
        )         
    }

    getPageTitle() {
        let pageTitle = 'Home',
            routePath = this.props.location.pathname;
        if (routePath.split('/').indexOf('profile') == 1) {
            pageTitle = 'My Desta';
        }

        if (routePath.indexOf('/explore') == 0) {
            pageTitle = 'Explore'
        }

        return pageTitle;
    }

    toggleLeftMenu() {
        this.props.toggleMenu();
    }

    handleUserMenuClosed() {
        this.setState({userMenuOpened: false});
    }

    openUserMenu(event) {
        event.preventDefault();
        this.setState({userMenuOpened: true, anchorEl: event.currentTarget});
    }

    login(e) {
        e.preventDefault();
        this.props.login(false);
    }

    render (){
        let {login, loggedInUser, selectLocation} = this.props;
        var userPhothURL = loggedInUser ? `https://graph.facebook.com/v2.7/${loggedInUser.id}/picture?type=small&width=45&height=45` : null,
            badgeStyle={padding: 5, top: -1, right: -1, width: 20, height: 20};

        return (
            <AppBar
                style={{position: 'fixed'}}
                title="Desta"
                onTitleTouchTap={() => browserHistory.push('/')}
                titleStyle={{cursor: 'pointer', flex: "initial", fontWeight: "300", fontSize: "22px"}}
                onLeftIconButtonTouchTap={this.toggleLeftMenu.bind(this)}>
                <div className="app-nav-bar">
                    <div className="separator" ></div>
                    <div className="left-nav-bar">
                        <span className="page-title">{ this.getPageTitle()}</span>
                        <div className="search" >
                            <PlacesAutocompleteInput
                            onBlur={this.onAutocompleteBlur.bind(this)}
                            onFocus={this.onAutocompleteFocus.bind(this)}
                            ref="autoComplete" placeholder="" selectLocation={selectLocation}
                            types={["(cities)"]} />
                                {this.state.placeHolderVisible && <div ref="searchPlaceHolder" onClick={this.onSearchClicked.bind(this)} className="font-icon font-icon-search search-place-holder">Search</div>}
                        </div>
                    </div>
                    <div className="right-nav-bar">
                        {/*
                        <Badge
                            style={{padding: "12px", marginRight: 10, marginTop: 8}}
                            badgeContent={4}
                            primary={true}
                            badgeStyle={badgeStyle}>
                            <NotificationsIcon color="rgba(255, 255, 255, 0.8)"/>
                        </Badge>
                        <Badge
                            style={{padding: "12px", marginRight: 20, marginTop: 8}}
                            badgeContent={10}
                            primary={true}
                            badgeStyle={badgeStyle}>
                            <MessageNotificationsIcon color="rgba(255, 255, 255, 0.8)"/>
                        </Badge>
                        */}
                        {loggedInUser && (
                                <RaisedButton onTouchTap={() => this.props.showNewTripForm(true)} className="new-trip" secondary={true} label="New Trip">
                                </RaisedButton>
                            )
                        }
                        {loggedInUser && (
                            <Avatar style={{cursor:'pointer'}} id={loggedInUser.id} width={35} height={35}/>
                        )}

                        {loggedInUser && (
                            <Popover
                                open={this.state.userMenuOpened}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.handleUserMenuClosed.bind(this)}
                            >
                                <Menu>
                                    <MenuItem primaryText="Sign out" onTouchTap={this.props.logout}/>
                                </Menu>
                            </Popover>
                        )}
                        {!loggedInUser &&
                            <RaisedButton
                                onTouchTap={this.login.bind(this)}
                                secondary={true} >
                                <a className="sign-in" onClick={this.login.bind(this)}><span className="font-icon font-icon-lock"></span>Sign in</a>
                            </RaisedButton>
                        }
                    </div>
                </div>
            </AppBar>
        );
    }
};

export default Header;

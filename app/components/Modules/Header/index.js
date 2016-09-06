// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
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

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {blue500, red500, green500} from 'material-ui/styles/colors';
import Avatar from 'components/Modules/Avatar';


class Header extends React.Component { 
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

    login() {
        this.props.login(false);
    }

    render (){
        let {login, loggedInUser, selectLocation, pageLinks} = this.props;
        var userPhothURL = loggedInUser ? `https://graph.facebook.com/v2.7/${loggedInUser.id}/picture?type=small&width=45&height=45` : null,
            badgeStyle={padding: 5, top: -1, right: -1, width: 20, height: 20};

        return (
            <AppBar
                title="Desta Travel"
                titleStyle={{flex: "initial"}}
                onLeftIconButtonTouchTap={this.toggleLeftMenu.bind(this)}>
                <div className="app-nav-bar">
                    <div className="left-nav-bar">
                        <span className="page-title">{ this.getPageTitle()}</span>
                        <div className="search" >
                            <PlacesAutocompleteInput
                            onBlur={this.onAutocompleteBlur.bind(this)}
                            onFocus={this.onAutocompleteFocus.bind(this)}
                            ref="autoComplete" placeholder="" selectLocation={selectLocation}
                            types={["(cities)"]} />
                                {this.state.placeHolderVisible && <div ref="searchPlaceHolder" onClick={this.onSearchClicked.bind(this)} className="font-icon font-icon-search search-place-holder">Explore:</div>}
                        </div>
                    </div>
                    <div className="right-nav-bar">
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
                        {loggedInUser && (
                            <Avatar onClick={this.openUserMenu.bind(this)} id={loggedInUser.id} width="30" height="30"/>
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

        // let {login, loggedInUser, selectLocation, pageLinks} = this.props;
        // var userPhothURL = loggedInUser ? `https://graph.facebook.com/v2.7/${loggedInUser.id}/picture?type=small&width=45&height=45` : null;
        // return (
        //     <div className={classNames("site-header-section", {"with-page-links": pageLinks != null})}>
        //         <div className="topHeader">
        //             <span className="menu-button font-icon font-icon-burger" />
        //             <div className="brand">
        //                 <a className="logo" href="#"><span className="logo-desta">Desta</span><span
        //                     className="logo-travel">Travel</span></a>
        //             </div>
        //             <div className="main-header">
        //                 <span className="page-title">{ this.getPageTitle()}</span>
        //                 <div className="search" >
        //                     <PlacesAutocompleteInput
        //                             onBlur={this.onAutocompleteBlur.bind(this)}
        //                             onFocus={this.onAutocompleteFocus.bind(this)}
        //                             ref="autoComplete" placeholder="" selectLocation={selectLocation}
        //                             types={["(cities)"]} />
        //                     {this.state.placeHolderVisible && <div ref="searchPlaceHolder" onClick={this.onSearchClicked.bind(this)} className="font-icon font-icon-search search-place-holder">Explore:</div>}
        //                 </div>
        //             </div>
        //             <div className="right-navigation">
        //                 <Link className="notifications" to="notifications">
        //                     <div className="icon-wrapper">
        //                         <span className="font-icon font-icon-alarm"></span>
        //                         <span className="label notification-number label-pill label-danger">4</span>
        //                     </div>
        //                 </Link>
        //                 <Link className="messages" to="messages">
        //                     <div className="icon-wrapper">
        //                         <span className="font-icon font-icon-mail"></span>
        //                         <span className="label notification-number label-pill label-danger">7</span>
        //                     </div>
        //                 </Link>
        //                 {loggedInUser && <div className="avatar-wrapper"><img className="avatar" src={userPhothURL}/></div>}
        //                 {!loggedInUser &&
        //                 <a className="sign-in" onClick={() => login(false)}><span className="font-icon font-icon-lock"></span>Sign in</a>}
        //             </div>
        //         </div>
        //         <ReactCSSTransitionGroup transitionLeaveTimeout={0} transitionName="component-fade"
        //                                  transitionAppear={true} transitionAppearTimeout={1000}>
        //             {pageLinks != null && this.renderLinks(pageLinks)}
        //         </ReactCSSTransitionGroup>
        //     </div>
        // )
    }
};

export default Header;

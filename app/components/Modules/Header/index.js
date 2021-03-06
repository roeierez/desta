// Simple header component

import '../../../resources/styles/main.less';
import React ,{PropTypes } from 'react';
import ReactDom from 'react-dom';
import {Link, IndexLink} from 'react-router';
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
import FriendsAutocomplete from 'components/Modules/FriendsAutocomplete';
import {formatShortDate} from 'lib/dateUtils';
import {formatTripName} from 'lib/tripUtils';
import AddDestinationDialog from 'components/Modules/AddDestinationDialog';
import moment from 'moment';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {blue500, red500, green500, lightWhite} from 'material-ui/styles/colors';
import Avatar from 'components/Modules/Avatar';
import {findTripByIdOrLink} from 'lib/tripUtils';


class Header extends React.Component {

    static propTypes = {
        login: PropTypes.func,
        logout: PropTypes.func,
        showNewTripForm: PropTypes.func,
        showAddDestinationForm: PropTypes.func,
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

    onFriendSelected(friend) {
        this.refs.search.clear(true);
        browserHistory.push(`/${friend.id}/profile/trips`);
    }

    showCreateTrip(e) {
        this.setState({
            createTripAnchorEl: e.currentTarget
        }, () => {
            this.props.showNewTripForm(true);
        })
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
                titleStyle={{cursor: 'pointer', flex: "initial", fontWeight: "300", fontSize: "18px"}}
                onLeftIconButtonTouchTap={this.toggleLeftMenu.bind(this)}>
                <AddDestinationDialog open={this.props.newTripFormVisible == true}
                                      anchorEl={this.state.createTripAnchorEl}
                                      isNewTrip={true}
                                      onCreateTrip={this.createTrip.bind(this, false)}
                                      onAddDestination={this.createTrip.bind(this, true)}
                                      onRequestClose={() => this.props.showNewTripForm(false)}/>
                <div className="app-nav-bar">
                    <div className="separator" ></div>
                    <div className="left-nav-bar">
                        <RaisedButton onTouchTap={(e) => this.showCreateTrip(e)} className="new-trip raise-button-rounded" secondary={true} label="New Trip">
                        </RaisedButton>
                        <div className="separator" ></div>
                        <div className="search">
                            <FontIcon className="material-icons" color="white">search</FontIcon>
                            <FriendsAutocomplete ref="search" onFriendSelected={(friend) => this.onFriendSelected(friend)} fullWidth={true} hintText="Search" hintStyle={{color: lightWhite}} inputStyle={{color: "white"}} floatingLabelText={false}  style={{ color:'white', height:"46px", marginTop: "0px"}}/>
                        </div>
                    </div>
                    <div className="right-nav-bar">
                        {
                            <NotificationsIcon color="rgba(255, 255, 255, 0.8)"/>
                        }
                        {
                            <MessageNotificationsIcon color="rgba(255, 255, 255, 0.8)"/>
                        }
                        <div className="separator" ></div>
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

    onAddDesintation(destination) {
        var trip = JSON.parse(JSON.stringify(findTripByIdOrLink(this.props.trips, this.props.params.id)));
        trip.destinations.push(destination);
        this.props.updateTrip(trip).payload.promise.then(() => {
            this.setState({destinationDialogOpened: false});
        })
    }

    createTrip(addMore, destination, tripName) {
        let trip = {
            destinations:[
                destination
            ]
        };

        this.props.createTrip({
            ...trip,
            name: tripName
        }).payload.promise.then(result => {
            console.log(result);
            if (addMore) {
                this.props.showAddDestinationForm(true);
            }
            browserHistory.push(`/${this.props.loggedInUser.id}/profile/trips/${result.payload.id}?addDestination=true`)
            this.props.showNewTripForm(false);
        });
    }
};

export default Header;

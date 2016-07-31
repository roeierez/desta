// Simple header component

import '../../../resources/styles/main.less';
import React from 'react';
import ReactDom from 'react-dom';
import {PlacesAutocompleteInput} from 'components/Modules/Form';
import {Link, IndexLink} from 'react-router';
import {Nav, NavItem, Navbar, Grid, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

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

    render (){
        let {login, loggedInUser, selectLocation, pageLinks} = this.props;
        var userPhothURL = loggedInUser ? `https://graph.facebook.com/v2.7/${loggedInUser.id}/picture?type=small&width=45&height=45` : null;
        return (
            <div className={classNames("site-header-section", {"with-page-links": pageLinks != null})}>
                <div className="topHeader">
                    <span className="menu-button font-icon font-icon-burger" />
                    <div className="brand">
                        <a className="logo" href="#"><span className="logo-desta">Desta</span><span
                            className="logo-travel">Travel</span></a>
                    </div>
                    <div className="main-header">
                        <span className="page-title">Home</span>
                        <div className="search" >
                            <PlacesAutocompleteInput 
                                    onBlur={this.onAutocompleteBlur.bind(this)} 
                                    onFocus={this.onAutocompleteFocus.bind(this)}
                                    ref="autoComplete" placeholder="" selectLocation={selectLocation}
                                    types={["(cities)"]} />
                            {this.state.placeHolderVisible && <div ref="searchPlaceHolder" onClick={this.onSearchClicked.bind(this)} className="font-icon font-icon-search search-place-holder">Where are you going?</div>}
                        </div>                
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
                {pageLinks != null && this.renderLinks(pageLinks)}                
            </div>
        )
    }
};

export default Header;

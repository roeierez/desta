import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import * as actionCreators from '../../redux/modules';

import Loading from 'components/Modules/Loading';
import Header from 'components/Modules/Header';

@connect(
    state => ({...state}),
    dispatch => bindActionCreators({...actionCreators.app}, dispatch),
)
export default class Root extends Component {

    static propTypes = {
        location: PropTypes.object,
        children: PropTypes.object,
        params: PropTypes.object,
        history: PropTypes.object,
        spinnerAsyncPage: PropTypes.bool,
        hideSpinnerAsyncPage: PropTypes.func,
    };

    componentDidReceiveProps(newProps) {
        console.error('props');
    }

    onLogin() {
        alert('logged in')
    }

    onLogout() {
        alert('on logout');
    }

    render() {

        return (
            <div className="container-fluid">
                <Header {...this.props.app} />
                <div className="page-content">
                    { this.props.children && React.cloneElement(this.props.children, this.props) }
                </div>
            </div>
        );
    }
}

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/modules';
import Header from 'components/Modules/Header';
import MainMenu from 'components/Modules/MainMenu';
import classNames from 'classnames';
import AddDestinationDialog from 'components/Modules/AddDestinationDialog';
import moment from 'moment';
import {browserHistory} from 'react-router';
import {formatShortDate} from 'lib/dateUtils';
import {formatTripName} from 'lib/tripUtils';

@connect(
    state => ({...state.profile, ...state.app, ...state.createTrip}),
    dispatch => bindActionCreators({...actionCreators.app, ...actionCreators.createTrip, ...actionCreators.profile}, dispatch),
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

    componentDidMount() {
        let action = this.props.login(true);;
    }

    render() {
        return (
            <div className="root-page">
                <Header {...this.props} />
                <div className={classNames("page-content-wrapper", "layout-row", {"with-page-links": (this.props.pageLinks != null)})}>
                    <MainMenu {...this.props} className="main-menu"/>
                    <div className="page-content use-all-space">
                        
                        { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
                    </div>
                </div>
            </div>
        );
    }
}

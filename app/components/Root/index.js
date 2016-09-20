import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/modules';
import Header from 'components/Modules/Header';
import MainMenu from 'components/Modules/MainMenu';
import classNames from 'classnames';
import Dialog from 'material-ui/Dialog';
import Card, {CardHeader, CardText} from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon';
import AddDestinationForm from 'components/Modules/AddDestinationForm';
import FlatButton from 'material-ui/FlatButton';

@connect(
    state => ({...state.profile, ...state.app, ...state.createTrip}),
    dispatch => bindActionCreators({...actionCreators.app, ...actionCreators.createTrip}, dispatch),
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

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={() => this.props.showNewTripForm(false)}
            />,
            <FlatButton
                label="Create Trip"
                primary={true}
                onTouchTap={() => this.props.showNewTripForm(false)}
            />
        ];

        return (
            <div className="root-page">
                <Header {...this.props} />
                <div className={classNames("page-content-wrapper", "layout-row", {"with-page-links": (this.props.pageLinks != null)})}>
                    <MainMenu {...this.props} className="main-menu"/>
                    <div className="page-content use-all-space">
                        {/*<TripInfoEditor />*/}

                        <Dialog title="New Trip"
                                modal={false}
                                contentStyle={{maxWidth: "450px"}}
                                actions = {actions}
                                open={this.props.newTripFormVisible == true}
                                onRequestClose={() => this.props.showNewTripForm(false)}>
                            <AddDestinationForm />
                        </Dialog>
                        { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
                    </div>
                </div>
            </div>
        );
    }
}

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/modules';
import Header from 'components/Modules/Header';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import MainMenu from 'components/Modules/MainMenu';

@connect(
    state => ({...state.app}),
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

    componentDidMount() {
        this.props.login(true);
    }

    render() {

        return (
            <div className="root-page container-fluid">
                <Header {...this.props} />
                <div className="page-content-wrapper layout-row">
                    <MainMenu className="main-menu"/>
                    <div className="page-content use-all-space">
                        {/*<TripInfoEditor />*/}
                        { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
                    </div>
                </div>
            </div>
        );
    }
}

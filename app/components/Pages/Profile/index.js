
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageSpinner from 'components/Modules/PageSpinner';
import * as actionCreators from 'redux-modules';

@connect(
    state => {
        return { ...state.profile }
    },
    dispatch => bindActionCreators({
        ...actionCreators.profile,
        ...actionCreators.app,
    }, dispatch),
)
class Profile extends React.Component {

    componentDidMount () {
        debugger;
        this.props.login();
    }

    render (){
        if (!this.props.loggedInUser) {
            return <PageSpinner/>
        }

        return (
            <div className="profilePage layout-column">
                { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
            </div>
        );
    }
};

export default Profile;
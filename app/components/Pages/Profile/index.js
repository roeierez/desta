
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
        var login = this.props.login();
        login.payload.promise.then(() => {
            return this.props.loadProfile();
        })
    }

    render (){
       // const props = Object.assign({}, this.props, this.props.children.props.children.prop);
        if (!this.props.loggedInUser) {
            return <div>Loading...</div>;
        }

        return (
            <div className="profilePage layout-column">
                { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
            </div>
        );
    }
};

export default Profile;
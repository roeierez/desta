
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
    }, dispatch),
)
class Profile extends React.Component {

    render (){
        const props = Object.assign({}, this.props, {children: undefined});
        return (
            <div className="profilePage">
                { this.props.children.props.children && React.cloneElement(this.props.children.props.children, props) }
            </div>
        );
    }
};

export default Profile;
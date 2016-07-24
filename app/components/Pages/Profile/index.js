
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
       // const props = Object.assign({}, this.props, this.props.children.props.children.prop);
        return (
            <div className="profilePage layout-column">
                { this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, this.props.children.props, this.props.children.props.children)) }
            </div>
        );
    }
};

export default Profile;
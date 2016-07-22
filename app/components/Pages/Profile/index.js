
import React from 'react';
import QuickTripWizard from 'components/Modules/QuickTripWizard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux-modules';
import TripsGallery from 'components/Modules/TripsGallery';

@connect(
    state => {
        return { ...state.profile }
    },
    dispatch => bindActionCreators({
        ...actionCreators.profile,
    }, dispatch),
)
class CreateTrip extends React.Component {

    render (){
        return (
            <div className="profilePage">
                <TripsGallery trips= {this.props.trips} />
            </div>
        );
    }
};

export default CreateTrip;
import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import QuickTripWizard from 'components/Modules/QuickTripWizard';
import MapView from 'components/Modules/MapView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'redux-modules';

@connect(
    state => {
        return {...state.createTrip}
    },
    dispatch => bindActionCreators({
        ...actionCreators.createTrip,
    }, dispatch),
)
class CreateTrip extends React.Component {

    render() {
        return (
            <div className="createTripPage">
                <div className="page-quickTripWizard"><QuickTripWizard {...this.props } /></div>
                <div></div>
                <div className="page-mapView"><MapView ref="mapView" {...this.props}/></div>
            </div>
        );
    }
}
;

export default CreateTrip;
import React from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import QuickTripWizard from 'components/Modules/QuickTripWizard';
import MapView from 'components/Modules/MapView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux-modules';

@connect(
    state => ({ ...state.createTrip }),
    dispatch => bindActionCreators({
        ...actionCreators.createTrip,
    }, dispatch),
)
class CreateTrip extends React.Component {

    render (){
        return (
            <Grid fluid={true}>
                <Row className="show-grid">
                    <Col xs={3}><QuickTripWizard {...this.props} /></Col>
                    <Col xs={9}><MapView ref="mapView" {...this.props}/></Col>
                </Row>
            </Grid>
        );
    }
};

export default CreateTrip;
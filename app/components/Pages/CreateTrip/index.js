import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import QuickTripWizard from 'components/Modules/QuickTripWizard';
import MapView from 'components/Modules/MapView';

const CreateTrip = (workingTrip, selectedMapLocation) => (
    <Grid>
        <Row className="show-grid">
            <Col xs={4}><QuickTripWizard /></Col>
            <Col xs={8}><MapView props={{}}/></Col>
        </Row>
    </Grid>
);

export default CreateTrip;
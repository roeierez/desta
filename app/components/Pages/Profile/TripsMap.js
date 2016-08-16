
import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import TripMapView from 'components/Modules/TripMapView'

class TripsMap extends React.Component {

    render (){
        return (
            <TripMapView workingTrip={this.props.trip} />
        );
    }
};

export default TripsMap;
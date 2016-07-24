
import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import MapView from 'components/Modules/MapView'

class TripsMap extends React.Component {

    render (){
        return (
            <MapView workingTrip={this.props.trip} />
        );;
    }
};

export default TripsMap;
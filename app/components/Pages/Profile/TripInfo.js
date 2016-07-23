
import React from 'react';
import {formatTripName} from 'lib/tripUtils';

class TripInfo extends React.Component {

    render (){
        var trip = this.props.trips.find( t => {
            return this.props.params.id == t.id;
        })
        return (
            <div className="trip-info">
                <div className="header">{formatTripName(trip, true)}</div>
                {
                    trip.destinations.map(d => (
                        <div className="destination">{d.tripDestination.cityName}</div>
                    ))
                }
            </div>
        );
    }
};

export default TripInfo;
import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import TripsCalendar from './TripsCalendar';
import {Link} from 'react-router';

class TripPage extends React.Component {

    render() {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });

        return (
            <div className="trip-info">
                <div className="header">{formatTripName(trip, true)}</div>
                {/*{*/}
                {/*trip.destinations.map(d => (*/}
                {/*<div className="destination">{d.tripDestination.cityName}</div>*/}
                {/*))*/}
                {/*}*/}
                <div className="content layout-row">
                    <div className="links">
                        <Link activeClassName="active" to={`/profile/trips/${trip.id}/calendar`}>Calendar</Link>
                        <Link activeClassName="active" to={`/profile/trips/${trip.id}/map`}>Map</Link>
                    </div>
                    { this.props.children && React.cloneElement(this.props.children, {trip, ...this.props}) }
                </div>
            </div>
        );
    }
}
;

export default TripPage;
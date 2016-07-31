import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import TripsCalendar from './TripsCalendar';
import {Link} from 'react-router';

class TripPage extends React.Component {

    componentDidMount() {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });
        this.props.setPageLinks([
            {
                to: `/profile/trips/${trip.id}/calendar`,
                label: 'Calendar'
            },
            {
                to: `/profile/trips/${trip.id}/map`,
                label: 'Map'
            }
        ])
    }

    componentWillUnmount () {
        this.props.setPageLinks(null);
    }
    render() {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });

        return (
            <div className="trip-info">
                {/*{*/}
                {/*trip.destinations.map(d => (*/}
                {/*<div className="destination">{d.tripDestination.cityName}</div>*/}
                {/*))*/}
                {/*}*/}
                <div className="content layout-column">                  
                    { this.props.children && React.cloneElement(this.props.children, {trip, ...this.props}) }
                </div>
            </div>
        );
    }
}
;

export default TripPage;
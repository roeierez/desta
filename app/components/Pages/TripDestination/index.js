import React from 'react';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import {findTripByIdOrLink} from 'lib/tripUtils';

class TripDestination extends React.Component {

    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    render() {
        let trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        if (trip == null || this.props.fetchingTrip) {
            return <div>loading</div>;
        }

        let destination = trip.destinations[+this.props.params.destinationId],
            canEdit = this.props.loggedInUser.id == trip.owner;

        return (
            <TripInfoEditor destination={destination} canEdit={canEdit} trip={trip} {...this.props} />
        )
    }
}

export default TripDestination;

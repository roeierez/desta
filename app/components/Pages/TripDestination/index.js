import React from 'react';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import {findTripByIdOrLink} from 'lib/tripUtils';
import PageSpinner from 'components/Modules/PageSpinner';

class TripDestination extends React.Component {

    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    render() {
        let trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        if (trip == null || this.props.fetchingTrip) {
            return <PageSpinner />
        }

        let destination = trip.destinations[+this.props.params.destinationId],
            canEdit = this.props.loggedInUser.id == trip.owner.facebookID;

        return (
            <TripInfoEditor destination={destination} canEdit={canEdit} trip={trip} {...this.props} />
        )
    }
}

export default TripDestination;

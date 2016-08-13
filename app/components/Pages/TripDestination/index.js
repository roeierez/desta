import React from 'react';
import TripInfoEditor from 'components/Modules/TripInfoEditor';

class TripDestination extends React.Component {

    componentDidMount() {
    }

    render() {
        let trip = this.props.trips.find(t => {
                return this.props.params.id == t.id;
            }),
            destination = trip.destinations[+this.props.params.destinationId];

        return (
            <TripInfoEditor destination={destination} trip={trip} {...this.props} />
        )
    }
}

export default TripDestination;

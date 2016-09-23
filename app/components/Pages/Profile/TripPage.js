import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import {Link} from 'react-router';
import TripsCalendar from './TripsCalendar';
import TripsMap from './TripsMap';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import {Panel} from 'react-bootstrap';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import TripFriends from 'components/Modules/TripFriends';
import DestinationListItem from './DestinationListItem';
import { browserHistory } from 'react-router'
import moment from 'moment';
import Avatar from 'components/Modules/Avatar';
import {findTripByIdOrLink} from 'lib/tripUtils';
import PageSpinner from 'components/Modules/PageSpinner';
import DestinationsList from 'components/Modules/DestinationsList';
import FontIcon from 'material-ui/FontIcon';
import AddDestinationDialog from 'components/Modules/AddDestinationDialog';
import TripHeader from './TripHeader';

let styles = {
    panel: {
        marginBottom: "20px"
    }
}

class TripPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            destinationDialogOpened: false
        }
    }

    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params && this.props.params &&  this.props.params.id != nextProps.params.id) {
            this.props.fetchTrip(nextProps.params.id);
        }
    }

    componentWillUnmount () {
    }

    onDestinationSelected(destination) {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        let index = trip.destinations.indexOf(destination);
        browserHistory.push(`/${trip.owner.facebookID}/profile/trips/${trip.id}/destination/${index}`);
    }

    showAddDestination() {
        this.setState({destinationDialogOpened: true});
    }

    onAddDesintation(destination) {
        var trip = JSON.parse(JSON.stringify(findTripByIdOrLink(this.props.trips, this.props.params.id)));
        trip.destinations.push(destination);
        this.props.updateTrip(trip).payload.promise.then(() => {
            this.setState({destinationDialogOpened: false});
        })
    }

    render() {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);

        if ( trip == null || this.props.fetchingTrip) {
            return <PageSpinner />;
        }

        return (
            <div className="trip-page">
                <TripHeader updateTrip={this.props.updateTrip} trip={trip} />
                <div className="trip-info">
                    <div className="left">
                        {
                            // <ResizeablePanel style={styles.panel} title="My Scheule">
                            //     <TripsCalendar trip={trip} {...this.props} />
                            // </ResizeablePanel>
                        }

                        <ResizeablePanel style={styles.panel} title="Friends with you">
                            <TripFriends classname="trip-friends" trip={trip} />
                        </ResizeablePanel>
                        <ResizeablePanel style={styles.panel} title="Destinations" rightIcon={<FontIcon onTouchTap={() => this.showAddDestination()} style={{float: 'right', cursor:'pointer'}} className="material-icons">add</FontIcon>}>
                            <DestinationsList destinations={trip.destinations} onDestinationSelected={this.onDestinationSelected.bind(this)} />
                        </ResizeablePanel>
                    </div>
                    {
                        // <div className="middle">
                        //     <ResizeablePanel style={styles.panel} title="Destinations">
                        //         <DestinationsList destinations={trip.destinations} />
                        //     </ResizeablePanel>
                        // </div>
                    }

                    <div className="right">
                        <TripsMap trip={trip} {...this.props} />
                    </div>
                </div>
                <AddDestinationDialog open={this.state.destinationDialogOpened}
                                      onSubmit={this.onAddDesintation.bind(this)}
                                      title="New Destination"
                                      submitButtonText="Add Destination"
                                      onRequestClose={() => this.setState({destinationDialogOpened: false})}/>
            </div>
        );
    }
}
;

export default TripPage;
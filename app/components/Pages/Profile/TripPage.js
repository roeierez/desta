import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import {Link} from 'react-router';
import TripsCalendar from './TripsCalendar';
import TripsMap from './TripsMap';
import TripInfoEditor from 'components/Modules/TripInfoEditor';
import {Panel} from 'react-bootstrap';
import ResizeablePanel from 'components/Modules/ResizeablePanel';
import TripFriends from 'components/Modules/TripFriends';
import { browserHistory } from 'react-router'
import moment from 'moment';
import Avatar from 'components/Modules/Avatar';
import {findTripByIdOrLink} from 'lib/tripUtils';
import PageSpinner from 'components/Modules/PageSpinner';
import DestinationsList from 'components/Modules/DestinationsList';
import FontIcon from 'material-ui/FontIcon';
import AddDestinationDialog from 'components/Modules/AddDestinationDialog';
import TripHeader from './TripHeader';
import {grey300} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

let styles = {
    header: {
        backgroundColor: 'white',
        fontSize: '16px',
        fontFamily: 'Roboto',
        borderColor: grey300,
        borderBottom: "1px solid " + grey300
    },
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

    onDeleteDestination(destination) {
        var trip = JSON.parse(JSON.stringify(findTripByIdOrLink(this.props.trips, this.props.params.id)));
        let toDelete = trip.destinations.find(d => d.tripDates.startDate == destination.tripDates.startDate),
            index = trip.destinations.indexOf(toDelete);
        trip.destinations.splice(index, 1);
        this.props.updateTrip(trip).payload.promise.then(() => {

        })
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
                            <ResizeablePanel expandable={true} style={{...styles.panel, flex: 0}} title="My Scheule">
                                <TripsCalendar trip={trip} {...this.props} />
                            </ResizeablePanel>
                        }
                        {
                            // <ResizeablePanel style={styles.panel} title="Friends with you">
                            //     <TripFriends classname="trip-friends" trip={trip} />
                            // </ResizeablePanel>
                        }
                        <Paper style={{display: 'flex', flexDirection: 'column'}} zDepth={2}>
                        <CardHeader style={styles.header} title="Destinations">
                            <FontIcon onTouchTap={() => this.showAddDestination()}
                                      style={{float: 'right', top: "-3px", marginRight: "0px", cursor:'pointer'}}
                                      className="material-icons">add</FontIcon>
                        </CardHeader>
                        <div style={{backgroundColor: 'white', overflowY: 'auto'}}>
                            <DestinationsList destinations={trip.destinations} onDeleteDestination={this.onDeleteDestination.bind(this)} onDestinationSelected={this.onDestinationSelected.bind(this)} />
                        </div>
                        </Paper>
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
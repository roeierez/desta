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

class TripPage extends React.Component {

    componentDidMount() {
        this.props.fetchTrip(this.props.params.id);
    }

    componentWillUnmount () {
    }

    onDestinationSelected(destination) {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);
        let index = trip.destinations.indexOf(destination);
        browserHistory.push(`/${trip.owner.facebookID}/profile/trips/${trip.id}/destination/${index}`);
    }

    render() {
        var trip = findTripByIdOrLink(this.props.trips, this.props.params.id);

        if (trip == null || this.props.fetchingTrip) {
            return <PageSpinner />;
        }

        var startDates = trip.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = trip.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        return (
            <div className="trip-page">
                <div className="trip-header">
                    <Avatar id={trip.owner.facebookID} height={60} width={60} />
                    <div className="trip-title">
                        <div className="trip-destinations">{trip.destinations.map(d => d.tripDestination.cityName).join(', ')}</div>
                        <div className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                    </div>
                </div>
                <div className="trip-info">
                    <div className="right-dashboard">
                        <ResizeablePanel className="trip-schedule" title="My Scheule">
                            <TripsCalendar trip={trip} {...this.props} />
                        </ResizeablePanel>
                        <ResizeablePanel title={"Destinations"} className="destinations-list">
                            {trip.destinations.map( d => {
                                return <DestinationListItem onSelected={this.onDestinationSelected.bind(this, d)} destination = {d}/>;
                            })}
                        </ResizeablePanel>
                        <ResizeablePanel resize={false} className="friends-panel" title="Friends with you">
                            <TripFriends classname="trip-friends" trip={trip} />
                        </ResizeablePanel>
                    </div>
                    <div className="top-dashboard">
                        <TripsMap trip={trip} {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}
;

export default TripPage;
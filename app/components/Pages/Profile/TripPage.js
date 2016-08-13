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

class TripPage extends React.Component {

    componentDidMount() {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });
        // this.props.setPageLinks([
        //     {
        //         to: `/profile/trips/${trip.id}/calendar`,
        //         label: 'Calendar'
        //     },
        //     {
        //         to: `/profile/trips/${trip.id}/map`,
        //         label: 'Map'
        //     }
        // ])
    }

    componentWillUnmount () {
        this.props.setPageLinks(null);
    }

    onDestinationSelected(destination) {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });
        let index = trip.destinations.indexOf(destination);
        browserHistory.push(`/profile/trips/${trip.id}/destination/${index}`);
    }

    render() {
        var trip = this.props.trips.find(t => {
            return this.props.params.id == t.id;
        });

        return (
            <div className="trip-info">
                <div className="top-dashboard">
                    <ResizeablePanel title="My Scheule">
                        <TripsCalendar trip={trip} {...this.props} />
                    </ResizeablePanel>
                    <TripsMap trip={trip} {...this.props} />
                </div>
                <div className="right-dashboard">
                    {/*<ResizeablePanel className="trip-information" title="Trip Information">*/}
                        {/*<TripInfoEditor trip={trip} {...this.props} />*/}
                    {/*</ResizeablePanel>*/}
                    <ResizeablePanel title={"Destinations"} className="destinations-list">
                        {trip.destinations.map( d => {
                            return <DestinationListItem onSelected={this.onDestinationSelected.bind(this, d)} destination = {d}/>;
                        })}
                    </ResizeablePanel>
                    <ResizeablePanel resize={false} className="friends-panel" title="Friends with you">
                        <TripFriends classname="trip-friends" trip={trip} />
                    </ResizeablePanel>
                </div>
            </div>
        );
    }
}
;

export default TripPage;
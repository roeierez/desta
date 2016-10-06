
import React from 'react';
import {formatTripName, isBookedDate} from 'lib/tripUtils';
import {formatShortDate} from 'lib/dateUtils';
import Calendar from 'components/Modules/Calendar'
import moment from 'moment';

class TripsCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    onDestinationDateChange(event, newDate) {
        let clonedTrip = JSON.parse(JSON.stringify(this.props.trip)),
            editedDestination = clonedTrip.destinations.find( d => d.tripDates.startDate == event.destination.tripDates.startDate && d.tripDates.endDate == event.destination.tripDates.endDate);

        editedDestination.tripDates = newDate;
        this.props.updateTrip(clonedTrip);
    }

    isInvalidDate(event, date) {
        let eventStart = moment(event.destination.tripDates.startDate),
            eventEnd = moment(event.destination.tripDates.endDate);

        if ( date.isBetween( eventStart, eventEnd ) || date.isSame(eventStart) || date.isSame(eventEnd)) {
            return false;
        }

        return isBookedDate(this.props.trip, date);
    }

    render (){
        var events = this.props.trip.destinations.map( d => {
                return {
                    start: moment(d.tripDates.startDate, 'YYYY-MM-DD').toDate(),
                    end: moment(d.tripDates.endDate, 'YYYY-MM-DD').toDate(),
                    title: d.tripDestination.cityName,
                    allDay: true,
                    destination: d
                }
            });
            // EventComponent = (props) => (
            //     <RangePicker isInvalidDate={this.isInvalidDate.bind(this, props.event)} onChange={this.onDestinationDateChange.bind(this, props.event)} innerComponent={props.title} title={props.title} value={{startDate: props.event.start, endDate: props.event.end}} />
            // );

        let props = {events};
        // if (this.props.loggedInUser.id == this.props.trip.owner.facebookID) {
        //     props.components = {event: EventComponent};
        // }
        return (
            <div className="calendar modal-container">
                <Calendar {...props} />
            </div>
        );
    }
};

export default TripsCalendar;
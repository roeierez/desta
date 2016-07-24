
import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import Calendar from 'components/Modules/Calendar'
import moment from 'moment';

class TripsCalendar extends React.Component {

    render (){
        var events = this.props.trip.destinations.map( d => {
            return {
                start: moment(d.tripDates.startDate, 'YYY-MM-DD').toDate(),
                end: moment(d.tripDates.endDate, 'YYY-MM-DD').toDate(),
                title: d.tripDestination.cityName,
                allDay: true
            }
        });
        return (
            <div className="calendar">
                <Calendar events={events} />
            </div>
        );
    }
};

export default TripsCalendar;
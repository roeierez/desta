
import React from 'react';
import {formatTripName} from 'lib/tripUtils';
import Calendar from 'components/Modules/Calendar'
import moment from 'moment';
import {Modal} from 'react-bootstrap';
import TripInfoEditor from 'components/Modules/TripInfoEditor'

class TripsCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }
    onSelectEvent (slotInfo) {
        this.setState({editMode: true})
    }

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
            <div className="calendar modal-container">
                <Calendar events={events} onSelectEvent={this.onSelectEvent.bind(this)} />
                {this.state.editMode && <div className="trip-editor"><Modal container={this} show={this.state.editMode}><TripInfoEditor {...this.props} /></Modal></div>}
            </div>
        );
    }
};

export default TripsCalendar;
import BigCalendar from 'react-big-calendar';
import React from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


class Calendar extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {        
        return (
            <BigCalendar
                {...this.props}
                toolbar={false}
                events={this.props.events}
                defaultDate={this.props.events[0].start}
            />
        )
    }
}

export default Calendar;
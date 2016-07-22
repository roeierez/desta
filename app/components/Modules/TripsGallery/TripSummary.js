import React from 'react';
import moment from 'moment'
import {Panel} from 'react-bootstrap';
import classNames from 'classnames';

class TripSummary extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var {tripInfo} = this.props,
            destinations = tripInfo.destinations.map(d => d.tripDestination.cityName),
            startDates = tripInfo.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = tripInfo.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        return (
            <div className={classNames("trip-summary", destinations[0].replace(/\s/g, '_').toLowerCase()) }>
                <div className="trip-content">
                    <div className="trip-destinations">{destinations.join(',')}</div>
                    <div className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                </div>
            </div>
        );
    }
}
export default TripSummary

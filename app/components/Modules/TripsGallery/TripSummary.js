import React from 'react';
import moment from 'moment'
import { browserHistory } from 'react-router'
import classNames from 'classnames';

class TripSummary extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick (event) {
        event.preventDefault();
        browserHistory.push(`/profile/trips/${this.props.tripInfo.id}`)
    }

    render() {
        var {tripInfo} = this.props,
            destinations = tripInfo.destinations.map(d => d.tripDestination.cityName),
            startDates = tripInfo.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = tripInfo.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        return (
            <div onClick={this.handleClick.bind(this)} className={classNames("trip-summary", destinations[0].replace(/\s/g, '_').toLowerCase()) }>
                <div className="trip-content">
                    <div className="trip-destinations">{destinations.join(',')}</div>
                    <div className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                </div>
            </div>
        );
    }
}
export default TripSummary

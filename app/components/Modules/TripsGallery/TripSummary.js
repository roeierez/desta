import React from 'react';
import moment from 'moment'
import { browserHistory } from 'react-router'
import classNames from 'classnames';
import {getCityClassName} from 'lib/tripUtils';

class TripSummary extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick (event) {
        event.preventDefault();
        browserHistory.push(`/${this.props.tripInfo.owner}/profile/trips/${this.props.tripInfo.id}`)
    }

    onShare (event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.shareTrip(this.props.tripInfo);
    }

    render() {
        var {tripInfo} = this.props,
            destinations = tripInfo.destinations.map(d => d.tripDestination.cityName),
            startDates = tripInfo.destinations.map(d => moment(d.tripDates.startDate)),
            endDates = tripInfo.destinations.map(d => moment(d.tripDates.endDate)),
            minDate = moment.min(startDates),
            maxDate = moment.max(endDates);

        return (
            <div onClick={this.handleClick.bind(this)} className={classNames("trip-summary", getCityClassName(destinations[0])) }>
                <div className="icons">
                    <i onClick={this.onShare.bind(this)} className="fa fa-share-alt" aria-hidden="true"></i>
                </div>
                <div className="trip-content">
                    <div className="trip-destinations">{destinations.join(',')}</div>
                    <div className="trip-dates">{`${minDate.format('ll')} - ${maxDate.format('ll')}`}</div>
                </div>
            </div>
        );
    }
}
export default TripSummary

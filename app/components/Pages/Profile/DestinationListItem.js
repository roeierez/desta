import React from 'react';
import {getCityClassName} from 'lib/tripUtils';
import {formatTripName} from 'lib/tripUtils';
import {parseShortDate} from 'lib/dateUtils';

class DestinationListItem extends React.Component {
    render() {
        let {destination} = this.props,
            startDate = parseShortDate(destination.tripDates.startDate),
            endDate = parseShortDate(destination.tripDates.endDate);
        return (
            <div onClick={this.props.onSelected} className="destination-list-item">
                <div className={getCityClassName(destination.tripDestination.cityName)} />
                <div className="destination-info">
                    <span className="title">{destination.tripDestination.cityName}</span>
                    <span className="details"></span>
                </div>
                <div className="destination-dates">
                    {startDate.format('MMMM DD') + ' - ' + endDate.format('MMMM DD')}
                </div>
            </div>
        )
    }
}

export default DestinationListItem;
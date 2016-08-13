
import {parseShortDate} from './dateUtils';
import moment from 'moment';

export const formatTripName = (trip, short) => {
    return trip.destinations.map(des => des.tripDestination.cityName).join(',');
}

export const getCityClassName = (cityName) => {
    return 'city-image ' + cityName.replace(/\s/g, '_').toLowerCase();
}

export const isBookedDate = (trip, date) => {
    let destinations = trip.destinations,
        bookedDatesRanges = destinations.map(d => {
            return d.tripDates;
        }),
        valid = true;
    bookedDatesRanges.forEach(b => {
        let start = parseShortDate(b.startDate),
            end = parseShortDate(b.endDate);
        if (moment(date.toString()).isAfter(start) && moment(date.toString()).isBefore(end)) {
            valid = false;
        }
    });
    return !valid;
};

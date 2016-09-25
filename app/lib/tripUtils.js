
import {parseShortDate} from './dateUtils';
import moment from 'moment';
import countryCodes, {isoCountries} from './countryCodes';

let citiesImages = [
    'barcelona',
    'new_york',
    'paris',
    'rome',
    'tokyo'
];

export const formatTripName = (trip, short) => {
    return trip.destinations.map(des => des.tripDestination.cityName).join(',');
}

export const getCityClassName = (cityName) => {
    return 'city-image ' + cityName.replace(/\s/g, '_').toLowerCase();
}

export const getCityImage = (cityName) => {
    let name = cityName.replace(/\s/g, '_').toLowerCase(),
        cityImage = citiesImages.indexOf(name) >= 0 ? name : citiesImages[0];

    return `/resources/images/cities/${cityImage}.jpg`;
};

export const findTripByIdOrLink = (trips, idOrLink) => {
    return trips.find(t => {
        var link = t.link && t.link.split('/').pop();
        return idOrLink == t.id || idOrLink == link;
    });
}

export const formatTitleAndSubtitle = (trip) => {
    let destinations = trip.destinations.map(d => d.tripDestination.cityName),
        startDates = trip.destinations.map(d => moment(d.tripDates.startDate)),
        endDates = trip.destinations.map(d => moment(d.tripDates.endDate)),
        minDate = moment.min(startDates),
        maxDate = moment.max(endDates);

    return {
        title: trip.name,
        subtitle: `${minDate.format('ll')} - ${maxDate.format('ll')}`
    }
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

export const findDestinationCountry = (tripDestination) => {
    if (!tripDestination.gmaps) {
        return null;
    }
    let countryComponent = tripDestination.gmaps.address_components.find(ad => ad.types.indexOf('country') >= 0);
    return isoCountries[countryComponent.short_name];
}

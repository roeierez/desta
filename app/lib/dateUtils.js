const moment = require('moment');

export const parseShortDate = (date) => {
    return moment(date, 'YYYY-MM-DD');
}

export const formatShortDate = (momentDate) => {
    return momentDate.format('YYYY-MM-DD');
}

export const formatRange = (start, end) => {
    return `${moment(start).format( 'MMM-DD-YY')} - ${moment(end).format( 'MMM-DD-YY')}`
}

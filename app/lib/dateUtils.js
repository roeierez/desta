const moment = require('moment');

export const parseShortDate = (date) => {
    return moment(date, 'YYYY-MM-DD');
}

export const formatShortDate = (momentDate) => {
    return momentDate.format('YYYY-MM-DD');
}

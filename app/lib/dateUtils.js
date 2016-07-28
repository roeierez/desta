const moment = require('moment');

export const parseShortDate = (date) => {
    return moment(date, 'YYY-MM-DD');
}

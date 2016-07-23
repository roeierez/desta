import {createReducer} from '../../utils/createReducer';
import moment from 'moment';

const initialState = {
    trips: []
};

// For async components
export default createReducer({
    ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: state.trips.concat(payload).sort( (t1, t2) => {
                var first = moment(t1.destinations[0].tripDates.startDate),
                    second = moment(t2.destinations[0].tripDates.startDate);
                return first.isSame(second) ? 0 : (first.isAfter(second) ? 1 : -1);
            })
        }
    },
}, initialState);
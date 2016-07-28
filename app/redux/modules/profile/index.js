import {createReducer} from '../../utils/createReducer';
import moment from 'moment';

const initialState = {
        trips: []
    },
    sortTrips = (trips) => {
        return trips.sort( (t1, t2) => {
            var first = moment(t1.destinations[0].tripDates.startDate),
                second = moment(t2.destinations[0].tripDates.startDate);
            return first.isSame(second) ? 0 : (first.isAfter(second) ? 1 : -1);
        })
    };

// For async components
export default createReducer({
    ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: sortTrips(state.trips.concat(payload))
        }
    },
    ['UPDATE_TRIP']: (state, {payload}) => {
        let {id} = payload,
            editedTrip = state.trips.find(t => t.id == id),
            tripAfterEdit = {...editedTrip, ...payload};
        return {
            ...state,
            trips: sortTrips( state.trips.filter(t => t.id != id).concat([tripAfterEdit]) )
        }
    }
}, initialState);

export const updateTrip = (tripInfo) => ({
    type: 'UPDATE_TRIP',
    payload: tripInfo
});
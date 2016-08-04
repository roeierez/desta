import {createReducer} from '../../utils/createReducer';
import moment from 'moment';
import fetch from 'isomorphic-fetch';

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
    ['UPDATE_TRIP_SUCCESS']: (state, {payload}) => {
        let {id} = payload,
            editedTrip = state.trips.find(t => t.id == id),
            tripAfterEdit = {...editedTrip, ...payload};
        return {
            ...state,
            trips: sortTrips( state.trips.filter(t => t.id != id).concat([tripAfterEdit]) )
        }
    },
    ['LOAD_PROFILE_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: sortTrips(payload)
        }
    }
}, initialState);

export const updateTrip = (tripInfo) => ({
    type: 'UPDATE_TRIP',
    payload: {promise: fetch(`/api/trips/${tripInfo.id}`, {credentials: 'include', headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(tripInfo)}).then(
        r => r.json()
    )}
});

export const loadProfile = () => {
    return {
        type: 'LOAD_PROFILE',
        payload: {promise: fetch('/api/trips', {credentials: 'include'}).then(r => r.json())}
    }
}
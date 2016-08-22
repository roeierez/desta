import {createReducer} from '../../utils/createReducer';
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import { loginAsync, logoutAsync } from 'lib/facebook';

const initialState = {
        trips: []
    },
    sortTrips = (trips) => {
        return trips.sort( (t1, t2) => {
            var first = moment(t1.destinations[0].tripDates.startDate),
                second = moment(t2.destinations[0].tripDates.startDate);
            return first.isSame(second) ? 0 : (first.isAfter(second) ? 1 : -1);
        })
    },
    applyUpdatedTrip = (state, payload) => {
        let {id} = payload,
            editedTrip = state.trips.find(t => t.id == id),
            tripAfterEdit = {...editedTrip, ...payload};
        return {
            ...state,
            trips: sortTrips( state.trips.filter(t => t.id != id).concat([tripAfterEdit]) )
        }
    }

// For async components
export default createReducer({
    ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: sortTrips(state.trips.concat(payload))
        }
    },
    ['UPDATE_TRIP_SUCCESS']: (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['UPDATE_TRIP_REQUEST']: (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['GENERATE_TRIP_LINK_SUCCESS'] : (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['LOAD_PROFILE_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: sortTrips(payload)
        }
    },
    ['ENTER_SHARE_MODE']: (state, {payload}) => {
        return {
            ...state,
            editedTrip: payload.id,
            editType: 'share'
        }
    },
    ['EXIT_SHARE_MODE']: (state, {payload}) => {
        return {
            ...state,
            editedTrip: null,
            editType: null
        }
    }
}, initialState);

export const updateTrip = (tripInfo) => ({
    type: 'UPDATE_TRIP',
    payload: {
        promise: fetch(`/api/trips/${tripInfo.id}`, {credentials: 'include', headers: {'Content-Type': 'application/json'}, method: 'PUT', body: JSON.stringify(tripInfo)}).then(
            r => r.json()
        ),
        data: tripInfo
    }
});

export const loadProfile = () => {
    return {
        type: 'LOAD_PROFILE',
        payload: {promise: fetch('/api/trips', {credentials: 'include'}).then(r => r.json())}
    }
}

export const enterShareMode = (trip) => {
    return {
        type: 'ENTER_SHARE_MODE',
        payload: trip
    }
}

export const exitShareMode = (trip) => {
    return {
        type: 'EXIT_SHARE_MODE'
    }
}

export const shareTrip = (trip, shareAudience) => {
    return updateTrip(Object.assign(JSON.parse(JSON.stringify(trip)), {shareAudience}));
}

export const generateTripLink = (trip) => {
    return {
        type: 'GENERATE_TRIP_LINK',
        payload: {promise: loginAsync(true).then(res =>  fetch(`/api/trips/${trip.id}/generateLink`, {credentials: 'include'})).then(
            r => r.json().then(json => ({
                id: trip.id,
                ...json
            }))
        )}
    }
}


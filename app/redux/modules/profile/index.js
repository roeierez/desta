import {createReducer} from '../../utils/createReducer';
import moment from 'moment';
import fetch from 'isomorphic-fetch';

const initialState = {
        trips: [],
        owner: null,
        loadingProfile: false
    },
    sortTrips = (trips) => {
        return trips.sort( (t1, t2) => {
            var first = moment(t1.destinations[0].tripDates.startDate),
                second = moment(t2.destinations[0].tripDates.startDate);
            return first.isSame(second) ? 0 : (first.isAfter(second) ? 1 : -1);
        })
    },
    applyUpdatedTrip = (state, payload, stateProps) => {
        let {id} = payload,
            editedTrip = state.trips.find(t => t.id == id),
            tripAfterEdit = {...editedTrip, ...payload};
        return {
            ...state,
            trips: sortTrips( state.trips.filter(t => t.id != id).concat([tripAfterEdit]) ),
            ...stateProps
        }
    }

// For async components
export default createReducer({
    // ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
    //     return {
    //         ...state,
    //         trips: sortTrips(state.trips.concat(payload))
    //     }
    // },
    ['UPDATE_TRIP_SUCCESS']: (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['UPDATE_TRIP_REQUEST']: (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['DELETE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            trips: state.trips.filter(t => t.id != payload)
        }
    },
    ['FETCH_TRIP_SUCCESS']: (state, {payload}) => {
        return applyUpdatedTrip(state, payload, {fetchingTrip: false});
    },
    ['FETCH_TRIP_REQUEST']: (state, {payload}) => {
        return {
            ...state,
            fetchingTrip: true
        }
    },
    ['GENERATE_TRIP_LINK_SUCCESS'] : (state, {payload}) => {
        return applyUpdatedTrip(state, payload);
    },
    ['LOAD_PROFILE_REQUEST']: (state, {payload}) => {
        return {
            ...state,
            loadingProfile: true,
            owner: null,
            trips: []
        }
    },
    ['LOAD_PROFILE_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            loadingProfile: false,
            owner: {facebookID: payload.facebookID, name: payload.name},
            trips: sortTrips(payload.trips || [])
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

export const removeDestinationItem = (trip, destinationId, collectionType, index) => {
    let tripCopy = JSON.parse(JSON.stringify(trip));
    let destination = tripCopy.destinations[+destinationId];
    let collectionItems = destination[collectionType];
    collectionItems.splice(index, 1);
    return updateTrip(tripCopy);
}

export const addDestinationItem = (trip, destinationId, collectionType, item) => {
    let tripCopy = JSON.parse(JSON.stringify(trip));
    let destination = tripCopy.destinations[+destinationId];
    let collectionItems = destination[collectionType];
    collectionItems.push(item);
    return updateTrip(tripCopy);
}

export const updateDestinationItem = (trip, destinationId, collectionType, itemIndex, item) => {
    let tripCopy = JSON.parse(JSON.stringify(trip));
    let destination = tripCopy.destinations[+destinationId];
    let collectionItems = destination[collectionType];
    collectionItems[itemIndex] = item;
    return updateTrip(tripCopy);
}

export const loadProfile = (ownerID) => {
    return {
        type: 'LOAD_PROFILE',
        payload: {promise: fetch('/api/trips?owner=' + ownerID, {credentials: 'include'}).then(r => r.json())}
    }
}

export const fetchTrip = (id) => {
    return {
        type: 'FETCH_TRIP',
        payload: {promise: fetch(`/api/trips/${id}`, {credentials: 'include'}).then(r => r.json())}
    }
}

export const enterShareMode = (trip) => {
    return {
        type: 'ENTER_SHARE_MODE',
        payload: trip
    }
}

export const deleteTrip = (tripID) => {
    return {
        type: 'DELETE_TRIP',
        payload: {
            promise: fetch(`/api/trips/${tripID}`, {credentials: 'include', headers: {'Content-Type': 'application/json'}, method: 'DELETE'})
                .then(() => tripID)
        }
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
        payload: {promise: fetch(`/api/trips/${trip.id}/generateLink`, {credentials: 'include'}).then(
            r => r.json().then(json => ({
                id: trip.id,
                ...json
            }))
        )}
    }
}

export const removeTripLink = (trip) => {
    return updateTrip({
        ...trip,
        link: null
    })
}


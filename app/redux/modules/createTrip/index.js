import {createReducer} from '../../utils/createReducer';
import {findDestinationCountry} from 'lib/tripUtils';

const initialState = {
    workingTrip: {
        destinations: []
    },
    selectedLocation: null,
    newTripFormVisible: false
};

// For async components
export default createReducer({
    ['SELECT_LOCATION']: (state, {payload}) => ({
        ...state,
        selectedLocation: payload
    }),
    ['ADD_DESTINATION']: (state, {payload}) => {
        if (payload.gmaps) {
            payload.country = findDestinationCountry(payload);
        }
        return {
            ...state,
            workingTrip: {
                ...state.workingTrip,
                destinations: state.workingTrip.destinations.concat(Object.assign({hotels: [], pois: [], notes: [], transporations: []}, payload))
            },
            selectedLocation: null
        }//var updatedTrip = Object.assign({id: dbId++, hotels: [], pois: [], notes: [], transporations: []}, trip)
    },
    ['REMOVE_DESTINATION']: (state, {payload}) => {
        return {
            ...state,
            workingTrip: {
                ...state.workingTrip,
                destinations: state.workingTrip.destinations.filter(d => d !== payload)
            },
            selectedLocation: null
        }
    },
    ['CREATE_TRIP_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            workingTrip: {
                destinations: []
            },
            selectedLocation: null
        }
    },
    ['SHOW_NEW_TRIP_FORM'] : (state, {payload}) => {
        return {
            ...state,
            newTripFormVisible: payload
        }
    }
}, initialState);

export const selectLocation = (location) => ({
    type: 'SELECT_LOCATION',
    payload: location
});

export const addDestination = (destination) => ({
    type: 'ADD_DESTINATION',
    payload: destination
});

export const removeDestination = (destination) => ({
    type: 'REMOVE_DESTINATION',
    payload: destination
})

export const showNewTripForm = (visible) => ({
    type: 'SHOW_NEW_TRIP_FORM',
    payload: visible
})

export const createTrip = (trip) => ({
    type: 'CREATE_TRIP',
    payload: {
        promise: new Promise((resolve, reject) => {
            trip.destinations.forEach(d => {
                d.tripDestination.cityName = d.tripDestination.label.split(',')[0];
            });
            fetch('/api/trips', {
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                shareAudience: 'public',
                body: JSON.stringify(trip)
            }).then(r => r.json()).then(resolve);
        })
    }
})


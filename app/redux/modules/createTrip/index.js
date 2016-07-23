import {createReducer} from '../../utils/createReducer';

const initialState = {
    workingTrip: {
        destinations: []
    },
    selectedLocation: null
};

// For async components
export default createReducer({
    ['SELECT_LOCATION']: (state, {payload}) => ({
        ...state,
        selectedLocation: payload
    }),
    ['ADD_DESTINATION']: (state, {payload}) => {
        return {
            ...state,
            workingTrip: {
                ...state.workingTrip,
                destinations: state.workingTrip.destinations.concat(payload)
            },
            selectedLocation: null
        }
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

var dbId = 10;
export const createTrip = (trip) => ({
    type: 'CREATE_TRIP',
    payload: {
        promise: new Promise((resolve, reject) => {
            trip.destinations.forEach(d => {
                d.tripDestination.cityName = d.tripDestination.label.split(',')[0];
            });
            setTimeout(() => {
                resolve(Object.assign({id: dbId++}, trip));
            }, 1000);
        })
    }
})


import {createReducer} from '../../utils/createReducer';
import {fetchFriendsLocations, getFriendsTrips} from '../../../lib/destaServices';
import fetch from 'isomorphic-fetch';
import { loginAsync, logoutAsync } from 'lib/facebook';
import moment from 'moment';

const initialState = {
        friendsLocations: [],
        fromDate: moment(new Date()).subtract(1,'years').toDate(),
        toDate: new Date(),
        loadingFriendsLocations: false,
        friendsTrips: [],
        loadingFriendsTrips: false,
        cityToShow: null
    };

// For async components
export default createReducer({
    ['FETCH_FRIENDS_LOCATIONS_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            friendsLocations: payload,
            loadingFriendsLocations: false
        }
    },
    ['FETCH_FRIENDS_LOCATIONS_REQUEST']: (state, {payload}) => {
        return {
            ...state,
            friendsLocations: [],
            loadingFriendsLocations: true
        }
    },

    ['FETCH_FRIENDS_TRIPS_REQUEST']: (state, {payload}) => {
        return {
            ...state,
            friendsTrips: [],
            loadingFriendsTrips: true
        }
    },
    ['FETCH_FRIENDS_TRIPS_SUCCESS']: (state, {payload}) => {
        return {
            ...state,
            friendsTrips: payload.trips,
            loadingFriendsTrips: false
        }
    },

    ['SELECT_POPULAR_CITY']: (state, {payload}) => {
        return {
            ...state,
            selectedPopularCity: payload
        }
    },

    ['SET_CITY_TO_SHOW']: (state, {payload}) => {
        return {
            ...state,
            cityToShow: payload
        }
    },

    ['SET_VISIT_TO_SHOW']: (state, {payload}) => {
        return {
            ...state,
            visitToShow: payload
        }
    },

    ['SELECT_TRAVELING_FRIEND']: (state, {payload}) => {
        return {
            ...state,
            selectedTravelingFriend: payload
        }
    },
    ['SELECT_COUNTRY']: (state, {payload}) => {
        return {
            ...state,
            selectedCountry: payload
        }
    },
    ['SET_FROM_DATE']: (state, {payload}) => {
        return {
            ...state,
            fromDate: payload
        }
    },
    ['SET_TO_DATE']: (state, {payload}) => {
        return {
            ...state,
            toDate: payload
        }
    }
}, initialState);

export const fetchLocations = () => {
    return {
        type: 'FETCH_FRIENDS_LOCATIONS',
        payload: {promise: fetchFriendsLocations()}
    }
}

export const fetchFriendsTrips = () => {
    return {
        type: 'FETCH_FRIENDS_TRIPS',
        payload: {promise: getFriendsTrips()}
    }
}

export const selectPopularCity = (city) => {
    return {
        type: 'SELECT_POPULAR_CITY',
        payload: city
    }
}

export const selectCountry = (country) => {
    return {
        type: 'SELECT_COUNTRY',
        payload: country
    }
}

export const setFromDate  = (date) => {
    return {
        type: 'SET_FROM_DATE',
        payload: date
    }
}

export const setToDate  = (date) => {
    return {
        type: 'SET_TO_DATE',
        payload: date
    }
}

export const setCityToShow = (city) => {
    return {
        type: 'SET_CITY_TO_SHOW',
        payload: city
    }
}

export const selectVisitToShow = (visit) => {
    return {
        type: 'SET_VISIT_TO_SHOW',
        payload: visit
    }
}

export const selectTravelingFriend = (userId) => {
    return {
        type: 'SELECT_TRAVELING_FRIEND',
        payload: userId
    }
}
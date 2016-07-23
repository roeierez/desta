import { createReducer } from '../../utils/createReducer';
import { loginAsync, logoutAsync } from 'lib/facebook';

const initialState = {
    loggedInUser: null
};

// For async components
export default createReducer({
    ['LOGIN_SUCCESS']: (state, { payload } ) => {
        return {
        ...state,
            loggedInUser: payload
        }
    },
    ['LOGOUT']: (state, { payload } ) => {
        return {
            ...state,
            loggedInUser: null
        }
    }
}, initialState);

export const login = (location) => ({
    type: 'LOGIN',
    payload: {promise: loginAsync()}
});

export const logout = (destination) => ({
    type: 'LOGOUT',
    payload: {promise: logoutAsync()}
});

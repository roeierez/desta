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

export const login = (silent) => ({
    type: 'LOGIN',
    payload: {promise: loginAsync(silent)}
});

export const logout = () => ({
    type: 'LOGOUT',
    payload: {promise: logoutAsync()}
});

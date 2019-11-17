import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};

const authStart = (state) => updateObject(state, { error: null, loading: true });
const authFail = (state, action) => updateObject(state, { error: action.error, loading: false });
const authSuccess = (state, action) => updateObject(state, {
    error: null, loading: false, token: action.idToken, userId: action.userId,
});
const authLogout = (state) => updateObject(state, { token: null, userId: null });
const setAuthRedirectPath = (state, action) => updateObject(state, { authRedirectPath: action.path });

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);

    default:
        return state;
    }
};

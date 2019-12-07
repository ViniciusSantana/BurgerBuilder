/* eslint-disable no-undef */
import reducer from './auth';
import { AUTH_SUCCESS } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
};
describe('auth reducers', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login', () => {
        const expectedState = updateObject(initialState, { token: 'some-token', userId: 'some-userid' });
        expect(reducer(initialState, { type: AUTH_SUCCESS, idToken: 'some-token', userId: 'some-userid' }))
            .toEqual(expectedState);
    });
});

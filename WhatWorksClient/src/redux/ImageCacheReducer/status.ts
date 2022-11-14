import { createAction } from 'redux-actions';

export const constants = {
    start: 'status.start',
};

// Actions object such that actions is 
// {start: [redux action]}
// {start: [status.start]}

export const actions = {
    start: createAction(constants.start),
};

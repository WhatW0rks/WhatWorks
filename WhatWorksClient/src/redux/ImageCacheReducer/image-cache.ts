import { createAction, handleActions } from 'redux-actions';

// Defines what each action is called for the reducer
// For a fetch action we call it 'image-cache.fetch'
// For a download action we call it 'image-cache.download'
// For a success action we call it 'image-cache.success'
// For a error action we call it'image-cache.error'

export const constants = {
    fetch: 'image-cache.fetch',
    download: 'image-cache.download',
    success: 'image-cache.success',
    error: 'image-cache.error',
};

// For every state, there is a loaded field and a loading field...
const defaultState = {
    loaded: {},
    loading: [],
};

// We create our appropriate actions for redux-actions to use based on the constants or names we 
// assigned them to...
export const actions = 
// Using the object constructor, uses a keys and returns a enumartable or an array of each
// action in a string array such as ["fetch", "download", "success", "error"]
// Next we reduce that list of actions...
Object.keys(constants).reduce((res, key) => 
    Object.assign(res, {[key]: createAction(constants[key])})
, {});

// When we recieve an action, this is what we do with them...
export default handleActions({

// ['image-cache.download'] => Do
[constants.download]: (state, { payload }) => {
    // Note (state, payload) looks at the current state and whats in the state (the payload)
    // If the loading state has the payload then we do nothing
    if (state.loading.includes(payload)) return state;
    // Else we return the new state where we inherit loaded object and the loading uri with 
    // some payload uri
    return {
    ...state,
    loading: [
        ...state.loading,
        payload.uri,
    ],
    };
},

// ['image-cache.success'] => Do
[constants.success]: (state, { payload }) => {
    // loading returns a boolean, if the loading state's uri is not the payload uri, we get true, 
    // false otherwise
    const loading = state.loading.filter((uri) => uri !== payload.uri);

    // We update the loaded field with the state of loaded and 
    // upload the payload uri with the local version for cache and quick retrieval
    const loaded = {
    ...state.loaded,
    [payload.uri]: payload.local,
    };

    // Return the object state
    return { loaded, loading };
},
// [error: 'image-cache.error'] => Do
[constants.error]: (state, { payload }) => {
    // Check if the current states loading is equal to the payloads uri, if not, then we return true
    // Else we return false
    const loading = state.loading.filter((uri) => uri !== payload.uri);

    // Return just the loading boolean state
    return { loading };
},
}, defaultState);
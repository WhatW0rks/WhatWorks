import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import {reducer} from './redux/ImageCacheReducer/image-cache';

import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './saga';
const sagaMiddleware = createSagaMiddleware();
const middleware = [
  sagaMiddleware,
];

export const store = configureStore({
  reducer: {
    user: userReducer, 
    images: reducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
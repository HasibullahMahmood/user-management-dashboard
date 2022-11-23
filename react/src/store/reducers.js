import { combineReducers } from '@reduxjs/toolkit';

// REDUCERS
import usersReducer from './slices/users';

const rootReducer = combineReducers({
	users: usersReducer,
});

export default rootReducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
	const response = await axios.request({
		url: 'http://localhost:4000/users',
	});
	return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (data) => {
	const response = await axios.request({
		url: 'http://localhost:4000/users',
		method: 'post',
		data,
	});
	return response.data;
});

const initialState = {
	list: [],
	loading: false,
	error: null,
};

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		// LOAD USER
		[loadUsers.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[loadUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[loadUsers.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
		// ADD USER
		[addUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[addUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.list.push(action.payload);
		},
		[addUser.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export default slice.reducer;

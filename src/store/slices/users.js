import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
	return await axios.request({
		url: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data',
	});
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
		[loadUsers.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[loadUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload.users;
		},
		[loadUsers.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		},
	},
});

export default slice.reducer;

import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const url = 'https://u-m-d-api.herokuapp.com/users';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
	const response = await axios.request({
		url,
	});
	return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (data) => {
	const response = await axios.request({
		url,
		method: 'post',
		data,
	});
	return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
	const response = await axios.request({
		url: `${url}/${userId}`,
		method: 'delete',
	});
	return { response: response.data, userId };
});

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
	const response = await axios.request({
		url: `${url}/${userId}`,
	});
	return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
	const response = await axios.request({
		url: `${url}/${user.id}`,
		method: 'patch',
		data: user,
	});
	return response.data;
});

const initialState = {
	list: [],
	loading: false,
	error: null,
	deleteLoading: false,
};

const setPending = (state) => {
	state.loading = true;
	state.error = null;
};

const setRejected = (state, action) => {
	state.loading = false;
	state.error = action.error.message;
};

const slice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		// LOAD USER
		[loadUsers.pending]: setPending,
		[loadUsers.fulfilled]: (state, action) => {
			state.loading = false;
			state.list = action.payload;
		},
		[loadUsers.rejected]: setRejected,
		// ADD USER
		[addUser.pending]: setPending,
		[addUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.list.push(action.payload);
		},
		[addUser.rejected]: setRejected,
		// DELETE USER
		[deleteUser.pending]: (state) => {
			state.deleteLoading = true;
			state.error = null;
		},
		[deleteUser.fulfilled]: (state, action) => {
			state.deleteLoading = false;
			state.list = state.list.filter((user) => user.id !== action.payload.userId);
		},
		[deleteUser.rejected]: (state, action) => {
			state.deleteLoading = false;
			state.error = action.error.message;
		},

		// FETCH USER BY ID
		[fetchUserById.pending]: setPending,
		[fetchUserById.fulfilled]: (state, action) => {
			state.loading = false;
			state.list.push(action.payload);
		},
		[fetchUserById.rejected]: setRejected,

		// UPDATE USER
		[updateUser.pending]: setPending,
		[updateUser.fulfilled]: (state, action) => {
			const updatedUser = action.payload;
			const index = state.list.findIndex((u) => u.id === updatedUser.id);
			if (index !== undefined) {
				state.list[index] = updatedUser;
			}
			state.loading = false;
		},
		[updateUser.rejected]: setRejected,
	},
});

export default slice.reducer;

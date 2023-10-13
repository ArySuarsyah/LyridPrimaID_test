import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listUsers: [],
  userId: '',
};

const users = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.listUsers = action.payload;
    },
    editUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {getUsers, editUser} = users.actions;
export default users.reducer;

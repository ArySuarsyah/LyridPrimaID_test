import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  listUsers: [],
};

const users = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.listUsers = action.payload;
    },
  },
});

export const {getUsers} = users.actions;
export default users.reducer;

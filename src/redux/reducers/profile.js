import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  dataProfile: {},
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    profileData: (state, action) => {
      state.dataProfile = action.payload;
    },
  },
});

export const {profileData} = profile.actions;
export default profile.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
};

const resource = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    resourceData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {resourceData} = resource.actions;
export default resource.reducer;

const {createSlice} = require('@reduxjs/toolkit');
import {asyncLogin, asyncRegister} from '../actions/authActions';

const initialState = {
  token: '',
  loginMessage: '',
  registerMessage: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: () => {
      return initialState;
    },
    deleteMessage: state => {
      state.loginMessage = '';
      state.registerMessage = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(asyncLogin.pending, (state, action) => {
      state.loginMessage = action.payload;
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.loginMessage = action.payload;
    });
    builder.addCase(asyncRegister.pending, (state, action) => {
      state.registerMessage = action.payload;
    });
    builder.addCase(asyncRegister.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(asyncRegister.rejected, (state, action) => {
      state.registerMessage = action.payload;
    });
  },
});

export const {login, logout, deleteMessage, sendPin} = auth.actions;
export default auth.reducer;

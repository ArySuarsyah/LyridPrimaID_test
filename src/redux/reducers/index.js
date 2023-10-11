import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import auth from './authReducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
});

export default reducer;

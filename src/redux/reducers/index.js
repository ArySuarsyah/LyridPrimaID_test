import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './authReducers';
import resource from './resourceReducers';
import profile from './profile';
import users from './userReducers';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const resourceConfig = {
  key: 'resource',
  storage: AsyncStorage,
};

const profileConfig = {
  key: 'profile',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  resource: persistReducer(resourceConfig, resource),
  profile: persistReducer(profileConfig, profile),
  users,
});

export default reducer;

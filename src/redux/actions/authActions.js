import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helper/http';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (payload, {rejectWithValue}) => {
    try {
      const form = {
        email: payload.email,
        password: payload.password,
      };
      const {data} = await http().post('/api/login', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data.token;
    } catch (error) {
      console.log('error:', error.response.data.error);
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const asyncRegister = createAsyncThunk(
  'asyncRegister',
  async (payload, {rejectWithValue}) => {
    try {
      const form = {
        email: payload.email,
        password: payload.password,
      };
      const {data} = await http().post('/api/register', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return data.token;
    } catch (error) {
      console.log('error:', error.response.data.error);
      if (error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue(error.message);
    }
  },
);

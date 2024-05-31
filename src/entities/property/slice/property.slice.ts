import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _inited: false,
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
});

export const { actions: userActions, reducer: userReducer } = propertySlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../types/booking.ts';

const initialState: Booking[] = [];

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.findIndex(
        booking => booking.id === action.payload.id,
      );
      if (index !== -1) state[index] = action.payload;
    },
    deleteBooking: (state, action: PayloadAction<Booking>) => {
      return state.filter(booking => booking.id !== action.payload.id);
    },
  },
});

export const { actions: bookingActions, reducer: bookingReducer } =
  bookingSlice;

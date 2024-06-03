import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, BookingSchema } from '../types/booking.ts';

const initialState: BookingSchema = {
  data: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.data.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.data.findIndex(
        booking => booking.id === action.payload.id,
      );
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteBooking: (state, action: PayloadAction<Booking>) => {
      state.data = state.data.filter(
        booking => booking.id !== action.payload.id,
      );
    },
  },
});

export const { actions: bookingActions, reducer: bookingReducer } =
  bookingSlice;

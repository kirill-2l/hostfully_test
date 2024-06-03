import { configureStore } from '@reduxjs/toolkit';
import { bookingReducer } from '../../features/booking/slice/booking.slice.ts';
import { StateSchema } from './state.schema.ts';

export const createReduxStore = (initialState?: StateSchema) =>
  configureStore({
    reducer: {
      booking: bookingReducer,
    },
    preloadedState: initialState,
  });

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

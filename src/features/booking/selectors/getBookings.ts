import { StateSchema } from '../../../providers/StoreProvider/state.schema.ts';

export const getBookings = (state: StateSchema) => state.booking.data;

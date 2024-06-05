import { Booking } from '../../types/booking.ts';
import { fromUnixTime } from 'date-fns';
import { ValidateBookingError } from '../../../property/types/IProperty.ts';

const isOverlapping = (newBooking: Booking, bookings: Booking[]) => {
  const newBookingStartDate = fromUnixTime(newBooking.startDate);
  const newBookingEndDate = fromUnixTime(newBooking.endDate);
  return bookings
    .filter(booking => booking.propertyId === newBooking.propertyId)
    .some(booking => {
      const startDate = fromUnixTime(booking.startDate);
      const endDate = fromUnixTime(booking.endDate);
      return (
        booking.id !== newBooking.id &&
        ((newBookingStartDate >= startDate && newBookingStartDate <= endDate) ||
          (newBookingEndDate >= startDate && newBookingEndDate <= endDate))
      );
    });
};

export const validateBookingData = (
  bookings: Booking[],
  newBooking?: Booking,
) => {
  if (!newBooking) {
    return [ValidateBookingError.NO_DATA];
  }

  const errors: ValidateBookingError[] = [];

  if (isOverlapping(newBooking, bookings)) {
    errors.push(ValidateBookingError.OVERLAPPING_BOOKING);
  }

  return errors;
};

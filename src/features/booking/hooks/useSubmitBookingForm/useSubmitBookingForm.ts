import { BookingFormData } from '../../components/BookingForm/BookingForm.tsx';
import { ValidateBookingError } from '../../../property/types/IProperty.ts';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings } from '../../selectors/getBookings.ts';
import { fromUnixTime, getUnixTime } from 'date-fns';
import { Booking } from '../../types/booking.ts';
import { bookingActions } from '../../slice/booking.slice.ts';
import { validateBookingData } from '../../services/validateBookingData/validateBookingData.ts';

export const useCreateUpdateBooking = (
  onClose: () => void,
  booking?: Partial<Booking>,
) => {
  const [errors, setErrors] = useState<ValidateBookingError[]>([]);
  const dispatch = useDispatch();
  const bookings = useSelector(getBookings);
  const isAddMode = !booking?.id;

  const onSubmit = (payload: BookingFormData) => {
    const [startDate, endDate] = payload.period;
    const startDateTimestamp = getUnixTime(startDate!);
    const endDateTimeStamp = getUnixTime(endDate!);
    const newBooking: Booking = {
      startDate: startDateTimestamp,
      endDate: endDateTimeStamp,
      guestsCount: payload.guestsCount,
      id: isAddMode
        ? String(Math.floor(Math.random() * 1000))
        : (booking?.id as string),
      propertyId: booking!.propertyId as string,
      propertyName: booking!.propertyName as string,
    };

    const error = validateBookingData(bookings, newBooking);

    setErrors(error);
    if (error?.length) {
      return errors;
    }
    onClose();
    isAddMode
      ? dispatch(bookingActions.addBooking(newBooking))
      : dispatch(bookingActions.updateBooking(newBooking));
  };

  const formData = {
    guestsCount: booking?.guestsCount ?? 0,
    endDate: booking?.endDate ? fromUnixTime(booking?.endDate) : undefined,
    startDate: booking?.startDate
      ? fromUnixTime(booking?.startDate)
      : undefined,
  };

  return {
    errors,
    onSubmit,
    formData,
  };
};

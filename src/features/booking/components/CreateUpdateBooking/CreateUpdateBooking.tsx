import { BookingForm } from '../BookingForm/BookingForm.tsx';
import { Booking } from '../../types/booking.ts';
import { useCreateUpdateBooking } from '../../hooks/useSubmitBookingForm/useSubmitBookingForm.ts';
import { memo } from 'react';

interface CreateBookingProps {
  isOpen: boolean;
  booking?: Partial<Booking>;
  onClose: () => void;
}

export const CreateUpdateBooking = memo((props: CreateBookingProps) => {
  const { isOpen, booking, onClose } = props;

  const { onSubmit, errors, formData } = useCreateUpdateBooking(
    onClose,
    booking,
  );

  return (
    booking && (
      <BookingForm
        isOpen={isOpen}
        title={`Reserve ${booking?.propertyName}`}
        errors={errors}
        formData={formData}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    )
  );
});

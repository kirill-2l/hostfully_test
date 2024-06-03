import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookingForm, BookingFormProps } from './BookingForm';
import { ValidateBookingError } from '../../../property/types/IProperty.ts';
import { componentRender } from '@/shared/libs/tests/componentRender.tsx';
import { userEvent } from '@testing-library/user-event';
import { startOfTomorrow } from 'date-fns';

describe('BookingForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  const defaultProps: BookingFormProps = {
    title: 'Test Booking Form',
    isOpen: true,
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnClose.mockClear();
  });

  test('works with valid data', async () => {
    componentRender(
      <BookingForm
        {...defaultProps}
        formData={{
          guestsCount: 1,
          startDate: new Date(),
          endDate: startOfTomorrow(),
        }}
      />,
    );
    await userEvent.click(screen.getByTestId('BookingForm.SubmitButton'));
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays external errors', () => {
    const errorProps = {
      ...defaultProps,
      errors: [ValidateBookingError.NO_DATA],
    };

    render(<BookingForm {...errorProps} />);

    expect(screen.getByText('Incorrect data')).toBeInTheDocument();
  });
});

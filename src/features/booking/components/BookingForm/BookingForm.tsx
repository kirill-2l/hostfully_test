import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Portal,
  VStack,
} from '@chakra-ui/react';

import { Controller, useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { memo, useCallback, useEffect, useState } from 'react';
import { isAfter } from 'date-fns';
import { ValidateBookingError } from '../../../property/types/IProperty.ts';

export interface BookingFormProps {
  title?: string;
  formData?: {
    guestsCount?: number;
    startDate?: Date;
    endDate?: Date;
  };
  errors?: ValidateBookingError[];
  isOpen?: boolean;
  onSubmit?: (booking: BookingFormData) => void;
  onClose: () => void;
}

export interface BookingFormData {
  guestsCount: number;
  period: [Date | null, Date | null];
}

export const BookingForm = memo((props: BookingFormProps) => {
  const { title, isOpen = false, errors, formData, onSubmit, onClose } = props;

  const [period, setPeriod] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [start, end] = period;

  const {
    handleSubmit,
    formState: { errors: localErrors },
    control,
    setValue,
  } = useForm<BookingFormData>({
    defaultValues: {
      guestsCount: 0,
      period: [undefined, undefined],
    },
  });

  const handleSubmitForm = useCallback(
    (data?: BookingFormData) => {
      if (data) {
        onSubmit?.(data);
      }
    },
    [onSubmit],
  );

  useEffect(() => {
    if (formData) {
      const {
        endDate = null,
        startDate = null,
        guestsCount = 0,
      } = props?.formData || {};
      setValue('guestsCount', guestsCount || 0);
      setValue('period', [startDate, endDate]);
      setPeriod([startDate, endDate]);
    }
  }, [formData]);

  const mapErrors = {
    [ValidateBookingError.OVERLAPPING_BOOKING]: 'Double booking',
    [ValidateBookingError.NO_DATA]: 'Incorrect data',
  };

  return (
    <Portal>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={['full', 'xs']}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {title && <DrawerHeader>{title}</DrawerHeader>}
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <DrawerBody>
              <VStack gap={4}>
                {errors?.length && (
                  <Alert status="error" data-testid="BookingForm.ErrorBlock">
                    <AlertIcon />
                    {errors.map(error => (
                      <AlertDescription key={error}>
                        {mapErrors[error]}
                      </AlertDescription>
                    ))}
                  </Alert>
                )}

                <FormControl
                  isRequired
                  isInvalid={Boolean(localErrors.guestsCount)}
                >
                  <FormLabel>How many guests?</FormLabel>
                  <Controller
                    name="guestsCount"
                    control={control}
                    rules={{
                      required: 'This is required',
                      min: {
                        value: 1,
                        message: 'Minimum number of guests is 1',
                      },
                    }}
                    render={({ field }) => (
                      <NumberInput
                        defaultValue={0}
                        {...field}
                        data-testid={'BookingForm.GuestsCountInput'}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  />
                  {localErrors.guestsCount && (
                    <FormErrorMessage>
                      {localErrors.guestsCount.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={Boolean(localErrors.period)}>
                  <FormLabel>Check in</FormLabel>
                  <Controller
                    name="period"
                    control={control}
                    rules={{
                      required: 'This is required',
                      validate: {
                        required: ([startDate, endDate]) =>
                          Boolean(startDate && endDate) ||
                          'two dates are required',
                        endDateGreater: ([startDate, endDate]) =>
                          isAfter(endDate!, startDate!) ||
                          'end date should be greater than start date',
                      },
                    }}
                    render={({ field }) => (
                      <DatePicker
                        minDate={new Date()}
                        startDate={start}
                        endDate={end}
                        withPortal
                        portalId="root-portal"
                        onChange={dates => {
                          setPeriod(dates);
                          field.onChange(dates);
                        }}
                        customInput={
                          <Input
                            data-testid={'BookingForm.CheckInDatePicker'}
                          />
                        }
                        selectsRange={true}
                      />
                    )}
                  />
                  {localErrors.period && (
                    <FormErrorMessage>
                      {localErrors.period.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type={'submit'}
                colorScheme="teal"
                data-testid={'BookingForm.SubmitButton'}
              >
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </Portal>
  );
});

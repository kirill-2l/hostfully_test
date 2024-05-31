import {
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Portal,
  VStack,
} from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import './BooingForm.styles.scss';

import DatePicker from 'react-datepicker';
import { useState } from 'react';

interface BookingFormProps {
  className?: string;
}

export const BookingForm = (props: BookingFormProps) => {
  const isOpen = true;
  const onClose = () => {};
  const [startDate, setStartDate] = useState(new Date());
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
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <VStack gap={4}>
              <FormControl isRequired>
                <FormLabel>How many guests?</FormLabel>
                <NumberInput defaultValue={0}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {!false && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Check in</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date: unknown) => setStartDate(date as Date)}
                />
                {!false && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Check out</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date: unknown) => setStartDate(date as Date)}
                />
                {!false && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal">Reserve</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Portal>
  );
};

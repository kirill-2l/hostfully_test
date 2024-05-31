import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { Booking } from '../model/types/booking.ts';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface BookingItemProps {
  data: Booking;
}

export const BookingItem = (props: BookingItemProps) => {
  const {
    data: { id, name, startDate, endDate },
  } = props;

  return (
    <Box>
      <HStack gap={'4'}>
        <Text>{name}</Text>
        <Text>{startDate}</Text>
        <Text>{endDate}</Text>
        <IconButton
          colorScheme="teal"
          aria-label="Delete booking"
          icon={<DeleteIcon />}
        />
        <IconButton
          colorScheme="teal"
          aria-label="Edit booking"
          icon={<EditIcon />}
        />
      </HStack>
    </Box>
  );
};

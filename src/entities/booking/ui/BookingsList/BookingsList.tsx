import { Box, Heading, Text } from '@chakra-ui/react';
import { Booking } from '../../model/types/booking.ts';
import { BookingItem } from '../BookingItem.tsx';

interface BookingsListProps {
  data: Booking[];
}

export const BookingsList = ({ data }: BookingsListProps) => {
  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
    >
      <Heading mb={4}>Your bookings</Heading>
      {data?.length ? (
        data.map(booking => <BookingItem data={booking} />)
      ) : (
        <Text color="gray.600">No bookings </Text>
      )}
    </Box>
  );
};

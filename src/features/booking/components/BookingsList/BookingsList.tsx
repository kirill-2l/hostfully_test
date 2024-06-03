import {
  Box,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { Booking } from '../../types/booking.ts';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bookingActions } from '../../slice/booking.slice.ts';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { format, fromUnixTime } from 'date-fns';
import { CreateUpdateBooking } from '../CreateUpdateBooking/CreateUpdateBooking.tsx';

interface BookingsListProps {
  data: Booking[];
}

export const BookingsList = memo(({ data }: BookingsListProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const [isUpdateFormOpen, setSUpdateFormOpen] = useState(false);
  const dispatch = useDispatch();
  const onUpdate = (booking: Booking) => {
    setSelectedBooking(booking);
    setSUpdateFormOpen(true);
  };
  const onDelete = (booking: Booking) => {
    dispatch(bookingActions.deleteBooking(booking));
  };
  const onClose = () => {
    setSUpdateFormOpen(false);
    setSelectedBooking(undefined);
  };

  const formatTimestamp = (timeStamp: number) => {
    return format(fromUnixTime(timeStamp), 'dd.MM.yyyy');
  };

  return (
    <>
      <Box
        maxW="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        gap={6}
      >
        <Heading mb={4}>Your bookings</Heading>
        {data?.length ? (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Property name</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Guests count</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map(booking => (
                  <Tr key={booking.id} data-testid="BookingList.Item">
                    <Td>{booking.propertyName}</Td>
                    <Td>{formatTimestamp(booking.startDate)}</Td>
                    <Td>{formatTimestamp(booking.endDate)}</Td>
                    <Td>{booking.guestsCount}</Td>
                    <Td>
                      <HStack gap={6}>
                        <IconButton
                          colorScheme="gray"
                          aria-label="Delete booking"
                          data-testid="BookingList.DeleteButton"
                          onClick={() => onDelete(booking)}
                          icon={<DeleteIcon />}
                        />
                        <IconButton
                          colorScheme="cyan"
                          aria-label="Edit booking"
                          data-testid="BookingList.EditButton"
                          icon={<EditIcon />}
                          onClick={() => onUpdate(booking)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text color="gray.600">No bookings </Text>
        )}
        <VStack gap={6} alignItems="start"></VStack>
      </Box>
      <CreateUpdateBooking
        isOpen={isUpdateFormOpen}
        onClose={onClose}
        booking={selectedBooking}
      />
    </>
  );
});

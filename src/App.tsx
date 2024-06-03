import './App.css';
import { PropertyList } from './features/property/components/PropertyList/PropertyList.tsx';
import { properties } from './data.ts';
import { BookingsList } from './features/booking/components/BookingsList/BookingsList.tsx';
import { Container, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getBookings } from './features/booking/selectors/getBookings.ts';

function App() {
  const bookings = useSelector(getBookings);

  return (
    <>
      <Container maxW="4xl" my={10}>
        <VStack gap={4} alignItems="stretch">
          <BookingsList data={bookings} />
          <PropertyList data={properties} />
        </VStack>
      </Container>
    </>
  );
}

export default App;

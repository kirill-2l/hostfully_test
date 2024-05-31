import './App.css';
import { PropertyList } from './entities/property/ui/PropertyList/PropertyList.tsx';
import { properties } from './data.ts';
import { BookingsList } from './entities/booking/ui/BookingsList/BookingsList.tsx';
import { Container, VStack } from '@chakra-ui/react';
import { BookingForm } from './entities/booking/ui/BookingForm/BookingForm.tsx';

function App() {
  return (
    <>
      <Container maxW="4xl" my={10}>
        <VStack gap={4} alignItems="stretch">
          <BookingsList data={[]} />
          <PropertyList data={properties} />
        </VStack>
        <BookingForm />
      </Container>
    </>
  );
}

export default App;

import { IProperty } from '../../types/IProperty.ts';
import { PropertyItem } from '../PropertyItem/PropertyItem.tsx';
import { Stack } from '@chakra-ui/react';
import { CreateUpdateBooking } from '../../../booking';
import { memo, useCallback, useEffect, useState } from 'react';
import { Booking } from '../../../booking/types/booking.ts';

interface PropertyListProps {
  data: IProperty[];
}

export const PropertyList = memo((props: PropertyListProps) => {
  const { data } = props;
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<IProperty>();
  const [initialBookingData, setInitialBookingData] =
    useState<Partial<Booking>>();

  useEffect(() => {
    selectedProperty
      ? setInitialBookingData({
          propertyName: selectedProperty?.name,
          propertyId: selectedProperty?.id,
        })
      : setInitialBookingData(undefined);
  }, [selectedProperty]);

  const onClose = () => {
    setIsCreateFormOpen(false);
    setSelectedProperty(undefined);
  };
  const onBookingClick = useCallback((property: IProperty) => {
    setSelectedProperty(property);
    setIsCreateFormOpen(true);
  }, []);
  return (
    <>
      <Stack spacing={6} direction={['column', 'row']}>
        {data.map(property => (
          <PropertyItem
            key={property.id}
            data={property}
            data-testid={'PropertyList.Item'}
            onBookingClick={onBookingClick}
          />
        ))}
      </Stack>
      <CreateUpdateBooking
        isOpen={isCreateFormOpen}
        onClose={onClose}
        booking={initialBookingData}
      />
    </>
  );
});

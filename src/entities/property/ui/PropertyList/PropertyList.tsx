import { IProperty } from '../../model/types/IProperty.ts';
import { PropertyItem } from '../PropertyItem/PropertyItem.tsx';
import { Stack } from '@chakra-ui/react';

interface PropertyListProps {
  data: IProperty[];
}

export const PropertyList = (props: PropertyListProps) => {
  const { data } = props;
  return (
    <Stack spacing={6} direction="row">
      {data.map(property => (
        <PropertyItem key={property.id} data={property}></PropertyItem>
      ))}
    </Stack>
  );
};

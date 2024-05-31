import { IProperty } from '../../model/types/IProperty.ts';
import { Badge, Box, Button, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface PropertyItemProps {
  data: IProperty;
}

export const PropertyItem = (props: PropertyItemProps) => {
  const { data } = props;
  const {
    name,
    currency,
    price,
    imgUrl,
    bedsCount,
    bathsCount,
    ratingScore,
    reviewsCount,
  } = data;
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imgUrl} alt={name} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {bedsCount} beds &bull; {bathsCount} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {name}
        </Box>

        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
            {`${price} ${currency}`} / night
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < ratingScore ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {reviewsCount} reviews
          </Box>
        </Box>

        <Button colorScheme={'teal'} mt={4} w={'100%'}>
          Book
        </Button>
      </Box>
    </Box>
  );
};

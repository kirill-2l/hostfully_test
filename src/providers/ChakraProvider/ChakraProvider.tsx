import { ChakraProvider as ChakraExternalProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const ChakraProvider = ({ children }: { children: ReactNode }) => {
  return <ChakraExternalProvider>{children}</ChakraExternalProvider>;
};

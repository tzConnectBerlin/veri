import { Box, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import theme from '../../design-system/theme/theme';

export const EventLayout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <header>Header</header>
        <Outlet />
        <footer>Footer</footer>
      </Box>
    </ChakraProvider>
  );
};

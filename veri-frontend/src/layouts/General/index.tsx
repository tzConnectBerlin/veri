import { ChakraProvider } from '@chakra-ui/provider';
import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import adminTheme from '../../design-system/theme/adminTheme';

export const GeneralLayout = () => {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('light');
  }, [setColorMode]);
  return (
    <ChakraProvider theme={adminTheme}>
      <Outlet />
    </ChakraProvider>
  );
};

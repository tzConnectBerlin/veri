import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import adminTheme from '../../design-system/theme/adminTheme';
import { ForceColorMode } from '../../utils/ColorMode';

export const GeneralLayout = () => {
  return (
    <ChakraProvider theme={adminTheme}>
      <ForceColorMode colorMode="light">
        <Outlet />
      </ForceColorMode>
    </ChakraProvider>
  );
};

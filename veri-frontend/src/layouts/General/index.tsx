import { ChakraProvider } from '@chakra-ui/provider';
import { Outlet } from 'react-router-dom';
import adminTheme from '../../design-system/theme/adminTheme';

export const GeneralLayout = () => {
  return (
    <ChakraProvider theme={adminTheme}>
      <Outlet />
    </ChakraProvider>
  );
};

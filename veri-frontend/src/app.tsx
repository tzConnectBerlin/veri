import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthProvider } from './contexts/useAuth';
import Fonts from './design-system/fonts/Fonts';
import { ToastProvider } from 'react-toast-notifications';
import { Suspense, useEffect } from 'react';
import adminTheme from './design-system/theme/adminTheme';

function App() {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('light');
  }, [setColorMode]);
  return (
    <Suspense fallback={'...Loading'}>
      <ChakraProvider theme={adminTheme}>
        <ToastProvider placement="bottom-right" autoDismiss>
          <Fonts />
          <BrowserRouter>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </BrowserRouter>
        </ToastProvider>
      </ChakraProvider>
    </Suspense>
  );
}

export default App;

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthProvider } from './contexts/useAuth';
import Fonts from './design-system/fonts/Fonts';
import { ToastProvider } from 'react-toast-notifications';
import { Suspense, useEffect } from 'react';
import adminTheme from './design-system/theme/adminTheme';

function App() {
  const ForceLightMode = (props: { children: JSX.Element }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
      if (colorMode === 'light') return;
      toggleColorMode();
    }, [colorMode, toggleColorMode]);

    return props.children;
  };

  return (
    <Suspense fallback={'...Loading'}>
      <ChakraProvider theme={adminTheme}>
        <ForceLightMode>
          <ToastProvider placement="bottom-right" autoDismiss>
            <Fonts />
            <BrowserRouter>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </BrowserRouter>
          </ToastProvider>
        </ForceLightMode>
      </ChakraProvider>
    </Suspense>
  );
}

export default App;

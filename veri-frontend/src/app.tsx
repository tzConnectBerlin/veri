import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/useAuth';
import theme from './design-system/theme/theme';
import Fonts from './design-system/fonts/Fonts';

function App() {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Fonts />
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;

import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/useAuth';

function App() {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider>
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

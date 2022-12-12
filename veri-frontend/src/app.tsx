import { ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthProvider } from './contexts/useAuth';
import Fonts from './design-system/fonts/Fonts';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div>
      <ColorModeScript />
      <ToastProvider placement="bottom-right" autoDismiss>
        <Fonts />
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;

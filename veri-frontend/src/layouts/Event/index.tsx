import { ChakraProvider, Stack, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Footer, FooterProps } from '../../design-system/organisms/Footer';
import { Header, HeaderProps } from '../../design-system/organisms/Header';
import eventTheme from '../../design-system/theme/eventTheme';

const HeaderData: HeaderProps = {
  title: 'VERIFICATION STATION',
  subtitle:
    'Scan your Kukai wallet QR code, get a VERI token to verify you were here.',
};

const FooterData: FooterProps = {
  links: [
    {
      title: 'TZ Connect',
      url: 'https://tzconnect.com/',
    },
    {
      title: 'Imprint',
      url: 'https://tzconnect.com/en/imprint/',
    },
    {
      title: 'Privacy Policy',
      url: 'https://tzconnect.com/en/privacy-policy/',
    },
  ],
};

export const EventLayout = () => {
  return (
    <ChakraProvider theme={eventTheme}>
      <Container>
        <Stack minH="100vh">
          <Header {...HeaderData} />
          <Outlet />
          <Footer {...FooterData} />
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

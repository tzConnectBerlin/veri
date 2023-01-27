import { ChakraProvider, Stack, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer, FooterProps } from '../../design-system/organisms/Footer';
import { Header, HeaderProps } from '../../design-system/organisms/Header';
import eventTheme from '../../design-system/theme/eventTheme';
import { ForceColorMode } from '../../utils/ColorMode';

const MainContainer = styled.main`
  flex: 1 1 0;
  margin-top: 0;
`;

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
      <ForceColorMode colorMode="dark">
        <Container>
          <Stack minH="100vh">
            <Header {...HeaderData} />
            <MainContainer>
              <Outlet />
            </MainContainer>
            <Footer {...FooterData} />
          </Stack>
        </Container>
      </ForceColorMode>
    </ChakraProvider>
  );
};

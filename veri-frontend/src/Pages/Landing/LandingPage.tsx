import { Box, Heading, Container, Text, Stack, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_URL } from '../../Global';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            <br />
            <Text as={'span'} color={'primary.main'}>
              Landing Page
            </Text>
          </Heading>
          <Text as={'span'} color={'primary.main'}>
            <Link onClick={() => navigate(ADMIN_URL)}>Go to Admin Panel</Link>
          </Text>
        </Stack>
      </Container>
    </>
  );
};

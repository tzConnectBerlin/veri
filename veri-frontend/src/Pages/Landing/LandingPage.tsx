import { Box, Heading, Container, Text, Stack } from '@chakra-ui/react';

export const LandingPage = () => {
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
            <Text as={'span'} color={'green.400'}>
              Landing Page
            </Text>
          </Heading>
        </Stack>
      </Container>
    </>
  );
};

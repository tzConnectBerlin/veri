import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export interface WrapperProps {
  bgColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  bgColor = 'white',
  borderColor = 'none',
  children,
}) => {
  return (
    <Box
      mb={4}
      p={3}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue(borderColor, 'gray.500')}
      backgroundColor={useColorModeValue(bgColor, 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
};

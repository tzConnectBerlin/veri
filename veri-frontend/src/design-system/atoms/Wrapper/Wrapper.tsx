import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export interface WrapperProps {
  bgColor?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  bgColor = 'white',
  children,
}) => {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue(bgColor, 'gray.500')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
};

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
      borderColor={useColorModeValue(borderColor, 'none')}
      backgroundColor={useColorModeValue(bgColor, 'blackAlpha.50')}
      borderRadius={'xl'}
    >
      {children}
    </Box>
  );
};

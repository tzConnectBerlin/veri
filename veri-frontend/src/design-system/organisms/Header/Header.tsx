import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Box py={12} textAlign="center">
      {title && <Heading mb={4}>{title}</Heading>}
      {subtitle && <Text>{subtitle}</Text>}
    </Box>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export interface SidebarLinkProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  isMatch?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  path,
  icon,
  isMatch,
}) => {
  const activeColor = useColorModeValue('primary.main', 'white');
  const activeBg = useColorModeValue('primary.50', 'white.100');
  const activeIcon = useColorModeValue('primary.main', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');

  return (
    <NavLink to={path} end>
      {({ isActive }) => (
        <HStack
          w="100%"
          alignItems="center"
          px={5}
          py={2}
          backgroundColor={isActive || isMatch ? activeBg : undefined}
        >
          <Box
            color={isActive || isMatch ? activeIcon : textColor}
            fontSize="1.5rem"
          >
            {icon}
          </Box>
          <Text me="auto" color={isActive || isMatch ? activeColor : textColor}>
            {name}
          </Text>
        </HStack>
      )}
    </NavLink>
  );
};

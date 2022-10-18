import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export interface SidebarLinkProps {
  name: string;
  path: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  path,
  icon,
  isActive,
}) => {
  const LayoutUrl = process.env.REACT_APP_ADMIN_URL || '/admin';
  const activeColor = useColorModeValue('blue.600', 'white');
  const activeBg = useColorModeValue('blue.50', 'white.100');
  const activeIcon = useColorModeValue('blue.600', 'white');
  const textColor = useColorModeValue('secondaryGray.500', 'white');

  return (
    <NavLink to={LayoutUrl + path}>
      <HStack
        w="100%"
        alignItems="center"
        px={5}
        py={2}
        backgroundColor={isActive ? activeBg : undefined}
      >
        <Box color={isActive ? activeIcon : textColor}>{icon}</Box>
        <Text me="auto" color={isActive ? activeColor : textColor}>
          {name}
        </Text>
      </HStack>
    </NavLink>
  );
};

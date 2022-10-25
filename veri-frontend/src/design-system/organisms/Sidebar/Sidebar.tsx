import React from 'react';
import {
  SidebarLink,
  SidebarLinkProps,
} from '../../atoms/SidebarLink/SidebarLink';
// chakra imports
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  Button,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export interface SidebarProps extends BoxProps {
  links: SidebarLinkProps[];
  onLogout: () => void;
  logo: string;
  userName: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  links,
  logo,
  onLogout,
  userName,
  ...rest
}) => {
  const location = useLocation();
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="10" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {logo}
        </Text>
      </Flex>
      {links.map((link, index) => (
        <SidebarLink
          isActive={activeRoute(link.path.toLowerCase()) ? true : false}
          {...link}
          key={index}
        />
      ))}

      <Box position="absolute" bottom={0} p={6}>
        {userName}
        <br />
        <Button colorScheme="primary" variant="link" onClick={onLogout}>
          Log out
        </Button>
      </Box>
    </Box>
  );
};

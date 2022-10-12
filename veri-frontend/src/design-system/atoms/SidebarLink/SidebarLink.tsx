import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

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
}) => {
  //   Chakra color mode
  const location = useLocation();
  const activeColor = useColorModeValue("gray.700", "white");
  // const inactiveColor = useColorModeValue(
  //   "secondaryGray.600",
  //   "secondaryGray.600"
  // );
  const activeIcon = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.500", "white");

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  return (
    <NavLink to={path}>
      <HStack w="100%" alignItems="center" px={5} py={2}>
        <Box
          color={activeRoute(path.toLowerCase()) ? activeIcon : textColor}
          me="18px"
        >
          {icon}
        </Box>
        <Text
          me="auto"
          color={activeRoute(path.toLowerCase()) ? activeColor : textColor}
          fontWeight={activeRoute(path.toLowerCase()) ? "bold" : "normal"}
        >
          {name}
        </Text>
      </HStack>
    </NavLink>
  );
};

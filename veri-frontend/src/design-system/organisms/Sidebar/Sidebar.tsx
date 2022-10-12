import React from "react";
import {
  SidebarLink,
  SidebarLinkProps,
} from "../../atoms/SidebarLink/SidebarLink";
// chakra imports
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from "@chakra-ui/react";

export interface SidebarProps extends BoxProps {
  links: SidebarLinkProps[];
  onClose: () => void;
  logo: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  links,
  logo,
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="10" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          {logo}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {links.map((link, index) => (
        <SidebarLink {...link} key={index} />
      ))}
    </Box>
  );
};

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  ChakraProvider,
} from '@chakra-ui/react';
import { FiSettings, FiUsers } from 'react-icons/fi';
import { MdViewList } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import { SidebarLinkProps } from '../../design-system/atoms/SidebarLink';
import { Sidebar } from '../../design-system/organisms/Sidebar';
import theme from '../../design-system/theme/theme';

const adminRoutes: SidebarLinkProps[] = [
  { name: 'All VERIs', icon: <MdViewList />, path: '/' },
  { name: 'User', icon: <FiUsers />, path: '/user' },
  { name: 'Settings', icon: <FiSettings />, path: '/settings' },
];

export const DashboardLayout = () => {
  const { isOpen, onClose } = useDisclosure();
  const logo = 'VERI Admin';
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Sidebar
          links={adminRoutes}
          logo={logo}
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
          userName="test"
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <Sidebar
              links={adminRoutes}
              onClose={onClose}
              logo={logo}
              userName="test"
            />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} py={10} px={14}>
          <Outlet />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

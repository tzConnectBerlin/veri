import { Box, useColorModeValue, ChakraProvider } from '@chakra-ui/react';
import { FiSettings, FiUsers } from 'react-icons/fi';
import { MdViewList } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import useAuth from '../../contexts/useAuth';
import { SidebarLinkProps } from '../../design-system/atoms/SidebarLink';
import { Sidebar } from '../../design-system/organisms/Sidebar';
import theme from '../../design-system/theme/theme';

const adminRoutes: SidebarLinkProps[] = [
  { name: 'All VERIs', icon: <MdViewList />, path: '/' },
  { name: 'User', icon: <FiUsers />, path: '/user' },
  { name: 'Settings', icon: <FiSettings />, path: '/settings' },
];

export const DashboardLayout = () => {
  const { logout } = useAuth();
  const logo = 'VERI Admin';

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Sidebar
          links={adminRoutes}
          logo={logo}
          onLogout={onLogout}
          display={{ base: 'none', md: 'block' }}
          userName="test"
        />
        <Box ml={{ base: 0, md: 60 }} py={10} px={14}>
          <Outlet />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

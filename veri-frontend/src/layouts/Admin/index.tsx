import { Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/provider';
import { MdViewList } from 'react-icons/md';
import { HiUser } from 'react-icons/hi2';
import { Outlet, useMatch } from 'react-router-dom';
import useAuth from '../../contexts/useAuth';
import { SidebarLinkProps } from '../../design-system/atoms/SidebarLink';
import { Sidebar } from '../../design-system/organisms/Sidebar';
import adminTheme from '../../design-system/theme/adminTheme';
import { useEffect } from 'react';
import { ADMIN_URL } from '../../Global';

export const DashboardLayout = () => {
  const { setColorMode } = useColorMode();
  const { logout, user } = useAuth();
  const veriMatch = useMatch({ path: `${ADMIN_URL}/veri`, end: false });
  const recipientsMatch = useMatch({ path: `${ADMIN_URL}/send`, end: false });
  const logo = 'VERI Admin';

  const adminRoutes: SidebarLinkProps[] = [
    { name: 'VERIs', icon: <MdViewList />, path: '', isMatch: !!veriMatch },
    {
      name: 'Recipients',
      icon: <HiUser />,
      path: 'recipients',
      isMatch: !!recipientsMatch,
    },
  ];

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setColorMode('light');
  }, [setColorMode]);

  return (
    <ChakraProvider theme={adminTheme}>
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Sidebar
          links={adminRoutes}
          logo={logo}
          onLogout={onLogout}
          display={{ base: 'none', md: 'block' }}
          userName={user.email}
        />
        <Box ml={{ base: 0, md: 60 }} py={10} px={14}>
          <Outlet />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

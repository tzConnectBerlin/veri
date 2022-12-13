import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Login } from '../../types';
import useAuth from '../../contexts/useAuth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BoothPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const [prevPath, setPrevPath] = useState();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required('This field is required'),
  });

  useEffect(() => {
    const prev = location.state?.prevRoute?.pathname;
    if (prev) {
      setPrevPath(prev);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const onSubmit = async (values: Login) => {
    try {
      setisLoading(true);
      login(values);
      if (user && prevPath) {
        navigate(prevPath);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: 'superadmin@veri.com',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Flex minH={'100vh'} align={'center'} bg={bgColor}>
      {prevPath && (
        <Stack spacing={8} mx={'auto'} maxW={'lg'}>
          <Box rounded={'lg'} bg={boxBgColor} boxShadow={'lg'} p={8} w="550px">
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4} align={'center'}>
                <Heading fontSize={'2xl'} pb={4}>
                  Please enter the password
                </Heading>
                <FormControl
                  isRequired
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                >
                  <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Stack style={{ alignSelf: 'stretch' }} pt={4}>
                  <Button
                    type="submit"
                    colorScheme="primary"
                    style={{ alignSelf: 'stretch' }}
                    isLoading={isLoading}
                  >
                    Get Access
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

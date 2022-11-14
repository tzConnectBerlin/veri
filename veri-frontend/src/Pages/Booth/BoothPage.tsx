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
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

export const BoothPage = () => {
  const { login } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    password: Yup.string().trim().required('This field is required'),
  });

  const onSubmit = async (values: Login) => {
    try {
      setisLoading(true);
      login(values);
    } catch (error) {
      // console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w="550px"
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} align={'center'}>
              <Heading fontSize={'2xl'} pb={4}>
                Please enter the password
              </Heading>
              <FormControl
                id="password"
                isRequired
                isInvalid={formik.touched.password && !!formik.errors.password}
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
    </Flex>
  );
};

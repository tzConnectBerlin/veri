import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Login } from '../../types';
import useAuth from '../../contexts/useAuth';

export const LoginPage = () => {
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    password: Yup.string().trim().required('This field is required'),
  });

  const onSubmit = async (values: Login) => {
    try {
      await login(values);
    } catch (error) {
      console.error(error);
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
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                id="email"
                isRequired
                isInvalid={formik.touched.email && !!formik.errors.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={formik.touched.password && !!formik.errors.password}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'primay.500'}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  disabled={
                    !formik.dirty ||
                    !!formik.errors.email ||
                    !!formik.errors.password
                  }
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

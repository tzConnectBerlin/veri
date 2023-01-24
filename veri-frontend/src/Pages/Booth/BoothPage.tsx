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
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { eventLogin } from '../../api/services/recipientsService';
import { EventAuth } from '../../types';

export const BoothPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const [prevPath, setPrevPath] = useState();
  const [eventName, setEventName] = useState<string | undefined>('');
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');

  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().required('This field is required'),
  });

  useEffect(() => {
    const prev = location.state?.prevRoute?.pathname;
    const event = location.state?.params?.eventName;
    if (prev && event) {
      setPrevPath(prev);
      setEventName(event);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const onSubmit = (values: EventAuth) => {
    console.log(values);
    try {
      setisLoading(true);
      eventLogin(values)
        .then(res => {
          console.log(res);
          if (eventName) sessionStorage.setItem(eventName, res.data.data.id);
          if (prevPath) navigate(prevPath, { state: res.data.data.id });
        })
        .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const initialValues = useMemo(
    () => ({
      name: eventName ?? '',
      password: '',
    }),
    [eventName],
  );

  return (
    <Flex minH={'100vh'} align={'center'} bg={bgColor}>
      {prevPath && (
        <Stack spacing={8} mx={'auto'} maxW={'lg'}>
          <Box rounded={'lg'} bg={boxBgColor} boxShadow={'lg'} p={8} w="550px">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <Stack spacing={4} align={'center'}>
                    <Heading fontSize={'2xl'} pb={4}>
                      Please enter the password
                    </Heading>
                    <FormControl
                      isRequired
                      isInvalid={touched.password && !!errors.password}
                    >
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
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
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      )}
    </Flex>
  );
};

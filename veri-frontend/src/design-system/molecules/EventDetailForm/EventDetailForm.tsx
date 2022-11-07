import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';

export interface EventDetailFormProps {
  title?: string;
}
export const EventDetailForm: React.FC<EventDetailFormProps> = ({ title }) => {
  const value = useContext(VeriContext);
  console.log(value);

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().trim().required('This field is required'),
    organizer: Yup.string().trim().required('This field is required'),
    organizerEmail: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    eventDuration: Yup.string().trim().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: value.EventDetailValues,
    validationSchema: validationSchema,
    onSubmit: value.onSubmit,
  });

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <Heading fontSize={'xl'} mb={4}>
        {title}
      </Heading>
      <Stack spacing={4}>
        <FormControl
          isRequired
          isInvalid={formik.touched.eventName && !!formik.errors.eventName}
        >
          <FormLabel>Event Name</FormLabel>
          <Input
            type="text"
            name="eventName"
            value={formik.values.eventName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.eventName}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={formik.touched.organizer && !!formik.errors.organizer}
        >
          <FormLabel>Organizer</FormLabel>
          <Input
            type="text"
            name="organizer"
            value={formik.values.organizer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.organizer}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={
            formik.touched.organizerEmail && !!formik.errors.organizerEmail
          }
        >
          <FormLabel>Organizer Email</FormLabel>
          <Input
            type="organizerEmail"
            name="organizerEmail"
            value={formik.values.organizerEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.organizerEmail}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={
            formik.touched.eventDuration && !!formik.errors.eventDuration
          }
        >
          <FormLabel>Event Duration</FormLabel>
          <RadioGroup name="eventDuration" onChange={formik.handleChange}>
            <Stack>
              <Radio value="single">Single Day</Radio>
              <Radio value="multi">Multi Days</Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>{formik.errors.eventDuration}</FormErrorMessage>
        </FormControl>
        {formik.values.eventDuration === 'multi' && <Heading>Hello</Heading>}
      </Stack>
    </Box>
  );
};

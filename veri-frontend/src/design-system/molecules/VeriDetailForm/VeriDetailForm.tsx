import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
  Textarea,
  Text,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';
import { VeriDetailValues } from '../../../types';

export interface VeriDetailFormProps {
  title?: string;
  onSubmit: () => void;
  initialValues: VeriDetailValues;
  eventTitle: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({
  onSubmit,
  title,
  initialValues,
  eventTitle,
}) => {
  const validationSchema = Yup.object().shape({
    artwork: Yup.string().trim().required('This field is required'),
    description: Yup.string().trim().required('This field is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
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
          isInvalid={formik.touched.artwork && !!formik.errors.artwork}
        >
          <FormLabel>Artwork</FormLabel>
          <Input
            type="file"
            name="artwork"
            value={formik.values.artwork}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.artwork}</FormErrorMessage>
        </FormControl>
        <Stack>
          <FormLabel>Title</FormLabel>
          <Text display="flex">
            VERI -{' '}
            {eventTitle || (
              <Text color="gray.200" ml={1}>
                Event Name
              </Text>
            )}
          </Text>
        </Stack>
        <FormControl
          isRequired
          isInvalid={formik.touched.description && !!formik.errors.description}
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formik.values.description}
            size="sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

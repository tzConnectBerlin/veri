import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import React from 'react';

export interface DistributionMethodFormProps {
  title?: string;
  onSubmit: () => void;
  initialValues: {
    distributionMethod?: 'QR code scanner' | 'Post-event drop';
  };
}
export const DistributionMethodForm: React.FC<DistributionMethodFormProps> = ({
  onSubmit,
  title,
  initialValues,
}) => {
  const validationSchema = Yup.object().shape({
    distributionMethod: Yup.string().trim().required('This field is required'),
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
          isInvalid={
            formik.touched.distributionMethod &&
            !!formik.errors.distributionMethod
          }
        >
          <FormLabel>Distribution Method</FormLabel>
          <RadioGroup name="distributionMethod" onChange={formik.handleChange}>
            <Stack>
              <Radio value="qr-code">Wallet QR code scanner</Radio>
              <Radio value="post-event">Post-event drop</Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            {formik.errors.distributionMethod}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

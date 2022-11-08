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
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';

export interface DistributionMethodFormProps {
  title?: string;
}
export const DistributionMethodForm: React.FC<DistributionMethodFormProps> = ({
  title,
}) => {
  const value = useContext(VeriContext);
  const formik = useFormik({
    initialValues: value.initialValues,
    validationSchema: value.validationSchema,
    onSubmit: () => console.log('inside'),
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

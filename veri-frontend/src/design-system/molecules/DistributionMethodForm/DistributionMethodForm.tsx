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
            value.formik.touched.distributionMethod &&
            !!value.formik.errors.distributionMethod
          }
        >
          <FormLabel>Distribution Method</FormLabel>
          <RadioGroup
            name="distributionMethod"
            onChange={value.formik.handleChange}
          >
            <Stack>
              <Radio value="qr-code">Wallet QR code scanner</Radio>
              <Radio value="post-event">Post-event drop</Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            {value.formik.errors.distributionMethod}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

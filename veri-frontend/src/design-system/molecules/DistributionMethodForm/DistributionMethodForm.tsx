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
  Text,
  Input,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { VERI_URL } from '../../../Global';
import { MakeURL } from '../../../utils/general';

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
      <Stack spacing={6}>
        <FormControl
          isRequired
          isInvalid={
            value.formik.touched.distributionMethod &&
            !!value.formik.errors.distributionMethod
          }
        >
          <FormLabel>Distribution Method</FormLabel>
          <RadioGroup name="distributionMethod">
            <Stack>
              <Radio value="QR-code" onChange={value.formik.handleChange}>
                Wallet QR code scanner
              </Radio>
              <Radio value="Post-event" onChange={value.formik.handleChange}>
                Post-event drop
              </Radio>
            </Stack>
          </RadioGroup>
          <FormErrorMessage>
            {value.formik.errors.distributionMethod}
          </FormErrorMessage>
        </FormControl>
        {value.formik.values.distributionMethod === 'QR-code' && (
          <>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Text display="flex" color="primary.main">
                {VERI_URL + '' + MakeURL(value.formik.values.eventName)}
              </Text>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                value.formik.touched.password && !!value.formik.errors.password
              }
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={value.formik.values.password}
                onChange={value.formik.handleChange}
                onBlur={value.formik.handleBlur}
              />
              <FormErrorMessage>
                {value.formik.errors.password}
              </FormErrorMessage>
            </FormControl>
          </>
        )}
      </Stack>
    </Box>
  );
};

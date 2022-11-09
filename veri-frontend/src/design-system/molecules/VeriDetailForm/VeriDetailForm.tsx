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
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';

export interface VeriDetailFormProps {
  title?: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({ title }) => {
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
            value.formik.touched.artwork && !!value.formik.errors.artwork
          }
        >
          <FormLabel>Artwork</FormLabel>
          <Input
            type="file"
            name="artwork"
            value={value.formik.values.artwork}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          <FormErrorMessage>{value.formik.errors.artwork}</FormErrorMessage>
        </FormControl>
        <Stack>
          <FormLabel>Title</FormLabel>
          <Text display="flex">
            VERI -{' '}
            {value.formik.values.eventName || (
              <Text color="gray.200" ml={1}>
                Event Name
              </Text>
            )}
          </Text>
        </Stack>
        <FormControl
          isRequired
          isInvalid={
            value.formik.touched.description &&
            !!value.formik.errors.description
          }
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={value.formik.values.description}
            size="sm"
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          <FormErrorMessage>{value.formik.errors.description}</FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

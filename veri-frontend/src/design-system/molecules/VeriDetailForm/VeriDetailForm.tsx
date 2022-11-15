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
  FormHelperText,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { GetImageSize } from '../../../utils/general';
import FileUploader from '../../atoms/FileUploader';

export interface VeriDetailFormProps {
  title?: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({ title }) => {
  const value = useContext(VeriContext);
  const size = 1000;

  const handleFileChange = async (file: File) => {
    console.log(file);
    const { width, height } = await GetImageSize(file);
    if (width > size || height > size) {
      value.formik.handleError();
    } else {
      value.formik.setFieldValue('artwork', file.name);
    }
  };

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
          <FileUploader
            name="artwork"
            aria-hidden="true"
            value={value.formik.values.artwork}
            onFileChanges={(val: File) => handleFileChange(val)}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          />
          {!value.formik.values.artwork && (
            <FormHelperText>
              Circle shape. PNG or GIF format. 1000x1000 px.
            </FormHelperText>
          )}
          {/* <Input
            type="file"
            name="artwork"
            aria-hidden="true"
            value={value.formik.values.artwork}
            onChange={value.formik.handleChange}
            onBlur={value.formik.handleBlur}
          /> */}
          <FormErrorMessage>{value.formik.errors.artwork}</FormErrorMessage>
        </FormControl>
        <Stack>
          <FormLabel>Title</FormLabel>
          <Text display="flex">
            VERI -{' '}
            {value.formik.values.eventName || (
              <Text color="gray.200" as="span" ml={1}>
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
            borderRadius={6}
          />
          <FormErrorMessage>{value.formik.errors.description}</FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

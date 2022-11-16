import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Textarea,
  Text,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import React, { useCallback, useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import FileUploader from '../../atoms/FileUploader';

export interface VeriDetailFormProps {
  title?: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({ title }) => {
  const context = useContext(VeriContext);

  const handleFileChange = useCallback(
    async (file?: File) => {
      if (typeof file === 'object') {
        context.formik.setFieldValue('artwork', file ?? null);
      }
    },
    [context.formik],
  );

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
            context.formik.touched.artwork && !!context.formik.errors.artwork
          }
        >
          <FormLabel>Artwork</FormLabel>
          <FileUploader
            name="artwork"
            aria-hidden="true"
            value={context.formik.values.artwork}
            onFileChanges={(val?: File) => handleFileChange(val)}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
            onError={
              context.formik.touched.artwork && !!context.formik.errors.artwork
            }
          />
          {!context.formik.values.artwork && (
            <FormHelperText>
              Circle shape. PNG or GIF format. 1000x1000 px.
            </FormHelperText>
          )}
          <FormErrorMessage>{context.formik.errors.artwork}</FormErrorMessage>
        </FormControl>
        <Stack>
          <FormLabel>Title</FormLabel>
          <Text display="flex">
            VERI -{' '}
            {context.formik.values.eventName || (
              <Text color="gray.200" as="span" ml={1}>
                Event Name
              </Text>
            )}
          </Text>
        </Stack>

        <FormControl
          isRequired
          isInvalid={
            context.formik.touched.description &&
            !!context.formik.errors.description
          }
        >
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={context.formik.values.description}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
          />
          <FormErrorMessage>
            {context.formik.errors.description}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

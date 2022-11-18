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
import React, { useCallback, useContext, useState } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { DIMENTION_SIZE } from '../../../Global';
import { GetImageSize } from '../../../utils/general';
import FileUploader from '../../atoms/FileUploader';

export interface VeriDetailFormProps {
  title?: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({ title }) => {
  const context = useContext(VeriContext);
  const [fileIsLarge, setFileIsLarge] = useState(false);

  // const handleFileChange = useCallback(
  //   async (file?: File) => {
  //     if (typeof file === 'object') {
  //       context.formik.setFieldValue('artwork', file ?? null);
  //     }
  //   },
  //   [context.formik],
  // );
  const handleFileChange = async (file: any) => {
    if (file) {
      context.formik.setFieldValue('artworkName', file.name);
      context.formik.setFieldValue('artworkFile', file);
      const { width, height } = await GetImageSize(file);
      if (width > DIMENTION_SIZE || height > DIMENTION_SIZE)
        setFileIsLarge(true);
    } else {
      setFileIsLarge(false);
      context.formik.setFieldValue('artworkName', '');
      context.formik.setFieldValue('artworkFile', undefined);
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
            context.formik.touched.artworkName &&
            (!!context.formik.errors.artworkName || fileIsLarge)
          }
        >
          <FormLabel>Artwork</FormLabel>
          <FileUploader
            name="artworkName"
            aria-hidden="true"
            onFileChanges={handleFileChange}
            onChange={context.formik.handleChange}
            onBlur={context.formik.handleBlur}
            isInvalid={
              context.formik.touched.artworkName &&
              (Boolean(context.formik.errors.artworkName) ||
                Boolean(context.formik.errors.artworkFile))
            }
          />
          {!context.formik.values.artworkName && (
            <FormHelperText>
              Circle shape. PNG or GIF format. 1000x1000 px.
            </FormHelperText>
          )}
          <FormErrorMessage>
            {context.formik.errors.artworkName ||
              (fileIsLarge && 'File is too large')}
          </FormErrorMessage>
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
          <FormHelperText>
            Description of the event in past tense, typically including event
            topic, organizers, location, and dates. Around 250 characters.
          </FormHelperText>
          <FormErrorMessage>
            {context.formik.errors.description}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

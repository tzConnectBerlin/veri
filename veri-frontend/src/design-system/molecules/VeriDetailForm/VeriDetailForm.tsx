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
  HStack,
  Button,
  Image,
} from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';
import { BASE_URL, DIMENTION_SIZE } from '../../../Global';
import { VeriFormStatus } from '../../../types';
import { GetImageSize } from '../../../utils/general';
import FileUploader from '../../atoms/FileUploader';

export interface VeriDetailFormProps {
  title?: string;
}
export const VeriDetailForm: React.FC<VeriDetailFormProps> = ({ title }) => {
  const context = useContext(VeriContext);
  const [editMode, setEditMode] = useState<VeriFormStatus>();
  const [fileIsLarge, setFileIsLarge] = useState(false);

  useEffect(() => {
    setEditMode(context.formType);
  }, [context]);

  const handleEdit = () => {
    context.formik.handleSubmit();
    setEditMode('View');
  };

  const handleFileChange = useCallback(
    async (file: any) => {
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
      <HStack justifyContent="space-between" mb={10}>
        <Heading fontSize={'xl'}>{title}</Heading>
        {editMode === 'View' && (
          <Button
            size="xs"
            border="none"
            variant="secondary"
            leftIcon={<MdEdit />}
            onClick={() => setEditMode('Edit')}
          >
            Edit
          </Button>
        )}
        {editMode === 'Edit' && (
          <Button
            size="xs"
            border="none"
            variant="secondary"
            leftIcon={<MdSave />}
            onClick={handleEdit}
          >
            Save
          </Button>
        )}
      </HStack>
      <Stack spacing={10}>
        <FormControl
          isReadOnly={editMode === 'View' ? true : false}
          isRequired
          isInvalid={
            context.formik.touched.artworkName &&
            (!!context.formik.errors.artworkName || fileIsLarge)
          }
        >
          <FormLabel>Artwork</FormLabel>
          {editMode === 'View' ? (
            <Image
              boxSize="120px"
              borderRadius="full"
              objectFit="cover"
              src={BASE_URL + '/' + context.formik.values.artworkName}
              alt=""
              mx="auto"
            />
          ) : (
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
              value={context.formik.values.artworkName}
            />
          )}

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
          isReadOnly={editMode === 'View' ? true : false}
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
          {editMode !== 'View' && (
            <FormHelperText>
              Description of the event in past tense, typically including event
              topic, organizers, location, and dates. Around 250 characters.
            </FormHelperText>
          )}
          <FormErrorMessage>
            {context.formik.errors.description}
          </FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

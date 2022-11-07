import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  Heading,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { MdDelete } from 'react-icons/md';

export interface RecipientsFormProps {
  title?: string;
  onSubmit: () => void;
  initialValues: {
    recipients: string[];
  };
}
export const RecipientsForm: React.FC<RecipientsFormProps> = ({
  onSubmit,
  title,
  initialValues = { recipients: [''] },
}) => {
  const validationSchema = Yup.object().shape({
    recipients: Yup.array()
      .of(Yup.string())
      .min(1)
      .required('This field is required'),
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
      <FormikProvider value={formik}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Reipients Address</FormLabel>

            <FieldArray
              name="recipients"
              render={(arrayHelper: any) => (
                <Stack spacing={4}>
                  {formik.values.recipients &&
                    formik.values.recipients.length > 0 &&
                    formik.values.recipients.map((addr, index) => (
                      <InputGroup size="md" key={index}>
                        <Input
                          pr="3rem"
                          name={`recipients.${index}`}
                          type="text"
                          placeholder="Type here"
                          value={addr}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <InputRightElement width="3rem">
                          <Button
                            size="md"
                            variant="ghost"
                            onClick={() => arrayHelper.remove(index)}
                          >
                            <MdDelete />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    ))}
                  <Button
                    variant="link"
                    colorScheme="primary"
                    onClick={() => arrayHelper.push('')}
                  >
                    + Add anouther recipients
                  </Button>
                </Stack>
              )}
            />
          </FormControl>
        </Stack>
      </FormikProvider>
    </Box>
  );
};

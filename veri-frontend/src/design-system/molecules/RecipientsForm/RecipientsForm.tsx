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
import { FieldArray, FormikProvider } from 'formik';
import React, { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';

export interface RecipientsFormProps {
  title?: string;
}
export const RecipientsForm: React.FC<RecipientsFormProps> = ({ title }) => {
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
      <FormikProvider value={value.formik}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Recipients Address</FormLabel>

            <FieldArray
              name="recipients"
              render={(arrayHelper: any) => (
                <Stack spacing={4}>
                  {value.formik.values.recipients &&
                    value.formik.values.recipients.length > 0 &&
                    value.formik.values.recipients.map(
                      (addr: string, index: number) => (
                        <InputGroup size="md" key={index}>
                          <Input
                            pr="3rem"
                            name={`recipients.${index}`}
                            type="text"
                            placeholder="Type here"
                            value={addr}
                            onChange={value.formik.handleChange}
                            onBlur={value.formik.handleBlur}
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
                      ),
                    )}
                  <Button
                    variant="link"
                    type="button"
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

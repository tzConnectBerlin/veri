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
  HStack,
} from '@chakra-ui/react';
import { FieldArray, FormikProvider } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { MdDelete, MdSave } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormStatus } from '../../../types';

export interface RecipientsFormProps {
  title?: string;
}
export const RecipientsForm: React.FC<RecipientsFormProps> = ({ title }) => {
  const context = useContext(VeriContext);
  const [editMode, setEditMode] = useState<VeriFormStatus>();

  useEffect(() => {
    setEditMode(context.formType);
  }, [context.formType]);

  const handleEdit = () => {
    context.formik.handleSubmit();
    setEditMode('View');
  };

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <HStack justifyContent="space-between" mb={10}>
        <Heading fontSize={'xl'}>{title}</Heading>
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
      <FormikProvider value={context.formik}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Recipients Address</FormLabel>

            <FieldArray
              name="recipients"
              render={(arrayHelper: any) => (
                <Stack spacing={4}>
                  {context.formik.values.recipients &&
                    context.formik.values.recipients.length > 0 &&
                    context.formik.values.recipients.map(
                      (addr: string, index: number) => (
                        <InputGroup size="md" key={index}>
                          <Input
                            pr="3rem"
                            name={`recipients.${index}`}
                            type="text"
                            placeholder="Type here"
                            value={addr}
                            onChange={context.formik.handleChange}
                            onBlur={context.formik.handleBlur}
                          />
                          <InputRightElement width="3rem">
                            <Button
                              size="md"
                              variant="icon"
                              onClick={() => {
                                if (context.formType === 'View')
                                  setEditMode('Edit');
                                arrayHelper.remove(index);
                              }}
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
                    onClick={() => {
                      if (context.formType === 'View') setEditMode('Edit');
                      arrayHelper.push('');
                    }}
                    alignSelf="flex-start"
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

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
import React, { useContext, useEffect, useState } from 'react';
import { MdDelete, MdSave } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormStatus } from '../../../types';

export interface RecipientsFormProps {
  title?: string;
  recipients: string[];
}
export const RecipientsForm: React.FC<RecipientsFormProps> = ({
  title,
  recipients,
}) => {
  // const context = useContext(VeriContext);
  // const [editMode, setEditMode] = useState<VeriFormStatus>();

  // useEffect(() => {
  //   setEditMode(context.formType);
  // }, [context.formType]);

  // const handleEdit = () => {
  //   context.formik.handleSubmit();
  //   setEditMode('View');
  // };

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <HStack justifyContent="space-between" mb={10}>
        <Heading fontSize={'xl'}>{title}</Heading>
        {/* {editMode === 'Edit' && (
          <Button
            size="xs"
            border="none"
            variant="secondary"
            leftIcon={<MdSave />}
            onClick={handleEdit}
          >
            Save
          </Button>
        )} */}
      </HStack>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Recipients Address</FormLabel>

          <FieldArray
            name="recipients"
            render={(arrayHelper: any) => (
              <Stack spacing={4}>
                {recipients &&
                  recipients.length > 0 &&
                  recipients.map((addr: string, index: number) => (
                    <InputGroup size="md" key={index}>
                      <Input
                        pr="3rem"
                        name={`recipients.${index}`}
                        type="text"
                        placeholder="Type here"
                        value={addr}
                      />
                      <InputRightElement width="3rem">
                        <Button
                          size="md"
                          variant="icon"
                          onClick={arrayHelper.remove(index)}
                        >
                          <MdDelete />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  ))}
                <Button
                  variant="link"
                  type="button"
                  onClick={arrayHelper.push('')}
                  alignSelf="flex-start"
                >
                  + Add anouther recipients
                </Button>
              </Stack>
            )}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldArray, useFormikContext } from 'formik';
import React, { ChangeEvent } from 'react';
import { MdDelete } from 'react-icons/md';
import { RecipientsVeri, VeriDropDown } from '../../../types';

export interface RecipientsFormProps {
  veris: VeriDropDown[];
  onVeriChange: (e: ChangeEvent<HTMLSelectElement>, setFieldValue: any) => void;
}
export const RecipientsForm: React.FC<RecipientsFormProps> = ({
  veris,
  onVeriChange,
}) => {
  const formik = useFormikContext<RecipientsVeri>();

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <Stack spacing={10}>
        <FormControl
          isRequired
          isInvalid={
            formik.touched.selectedVeri && !!formik.errors.selectedVeri
          }
        >
          <FormLabel>VERI</FormLabel>
          <Select
            name="selectedVeri"
            placeholder="Select an option"
            value={formik.values.selectedVeri?.id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onVeriChange(e, formik.setFieldValue);
            }}
          >
            {veris.map(veri => (
              <option value={veri.id} key={veri.id}>
                {veri.title}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{formik.errors.selectedVeri}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={formik.touched.recipients && !!formik.errors.recipients}
        >
          <FormLabel>Recipients Address</FormLabel>

          <FieldArray
            name="recipients"
            render={(arrayHelper: any) => (
              <Stack spacing={4}>
                {formik.values.recipients &&
                  formik.values.recipients.length > 0 &&
                  formik.values.recipients.map(
                    (addr: string, index: number) => (
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
                            variant="icon"
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
                  onClick={() => arrayHelper.push('')}
                  alignSelf="flex-start"
                >
                  + Add anouther recipients
                </Button>
              </Stack>
            )}
          />
          <FormErrorMessage>{formik.errors.recipients}</FormErrorMessage>
        </FormControl>
      </Stack>
    </Box>
  );
};

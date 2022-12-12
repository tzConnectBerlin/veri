import {
  Box,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  RadioGroup,
  Radio,
  Text,
  Input,
  HStack,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { VeriContext } from '../../../contexts/veri';
import { VERI_URL } from '../../../Global';
import { VeriFormStatus } from '../../../types';
import { MakeURL } from '../../../utils/general';

export interface DistributionMethodFormProps {
  title?: string;
}
export const DistributionMethodForm: React.FC<DistributionMethodFormProps> = ({
  title,
}) => {
  const context = useContext(VeriContext);
  const [editMode, setEditMode] = useState<VeriFormStatus>();

  useEffect(() => {
    setEditMode(context.formType);
  }, [context.formType]);

  const handleEdit = () => {
    context.formik.handleSubmit();
    // setEditMode('View');
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
            context.formik.touched.distributionMethod &&
            !!context.formik.errors.distributionMethod
          }
        >
          <FormLabel>Distribution Method</FormLabel>
          {editMode !== 'View' ? (
            <>
              <RadioGroup
                name="distributionMethod"
                value={context.formik.values.distributionMethod}
              >
                <Stack>
                  <Radio value="QR-code" onChange={context.formik.handleChange}>
                    Wallet QR code scanner
                  </Radio>
                  <Radio
                    value="Post-event"
                    onChange={context.formik.handleChange}
                  >
                    Post-event drop
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {context.formik.errors.distributionMethod}
              </FormErrorMessage>
            </>
          ) : (
            <Text>
              {context.formik.values.distributionMethod === 'QR-code'
                ? 'Wallet QR code scanner'
                : 'Post-event drop'}
            </Text>
          )}
        </FormControl>
        {context.formik.values.distributionMethod === 'QR-code' && (
          <>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Text display="flex" color="primary.main">
                {VERI_URL + '' + MakeURL(context.formik.values.eventName)}
              </Text>
            </FormControl>
            {editMode !== 'View' && (
              <FormControl
                isRequired
                isInvalid={
                  context.formik.touched.password &&
                  !!context.formik.errors.password
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={context.formik.values.password}
                  onChange={context.formik.handleChange}
                  onBlur={context.formik.handleBlur}
                />
                <FormErrorMessage>
                  {context.formik.errors.password}
                </FormErrorMessage>
              </FormControl>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

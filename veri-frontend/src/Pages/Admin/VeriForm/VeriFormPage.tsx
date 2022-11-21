import { Container, Heading, Stack, useToast } from '@chakra-ui/react';
import { VeriContext } from '../../../contexts/veri';
import {
  VeriFormValues,
  VeriFormikType,
  EventDetailValues,
} from '../../../types/veris';
import * as Yup from 'yup';
import AddVeri from '../../../design-system/organisms/AddVeri';
import { FormikHelpers, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { MapVeriToServerValue } from '../../../utils/veri';
import { addVeri } from '../../../api/services/veriService';

export const VeriFormPage = (): JSX.Element => {
  const toast = useToast();
  const EventDetailValues: EventDetailValues = {
    eventName: '',
    organizer: '',
    organizerEmail: '',
    eventDuration: 'Single',
    eventStartDate: '',
    eventEndDate: '',
  };
  const VeriDetailValues = {
    artworkName: '',
    artworkFile: undefined,
    description: '',
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().trim().required('This field is required'),
    organizer: Yup.string().trim().required('This field is required'),
    description: Yup.string().max(250).required('This field is required'),
    distributionMethod: Yup.string().trim().required('This field is required'),
    recipients: Yup.array().of(Yup.string()).min(1),
    organizerEmail: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    artworkName: Yup.string().required('This field is required'),
  });

  const handleSubmit = useCallback(
    (values: VeriFormValues, actions: FormikHelpers<VeriFormValues>) => {
      try {
        const body = MapVeriToServerValue(values);
        addVeri(body)
          .then(res => {
            toast({
              title: `Veri ${values.status}`,
              description: 'View on the list',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            console.log(res);
          })
          .catch(e => {
            toast({
              title: 'Something went wrong.',
              description: 'Try again later.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            console.error(e);
          });
        actions.resetForm();
      } catch (err) {
        console.error(err);
        toast({
          title: 'Something went wrong.',
          description: 'Try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [toast],
  );

  const formik = useFormik({
    initialValues: {
      ...EventDetailValues,
      ...VeriDetailValues,
      recipients: [''],
      distributionMethod: 'Post-event',
      password: '',
      status: 'Draft',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const veriDefaultValue: VeriFormikType = {
    formik: formik,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW="2xl">
        <Stack justifyContent="space-between">
          <Heading mb={10}>Create New VERI</Heading>
          <VeriContext.Provider value={veriDefaultValue}>
            <AddVeri />
          </VeriContext.Provider>
        </Stack>
      </Container>
    </motion.div>
  );
};

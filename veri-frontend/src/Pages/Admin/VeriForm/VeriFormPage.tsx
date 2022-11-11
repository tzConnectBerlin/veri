import { Container, Heading, Stack } from '@chakra-ui/react';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormValues, VeriFormikType } from '../../../types/veris';
import * as Yup from 'yup';
import AddVeri from '../../../design-system/organisms/AddVeri';
import { FormikHelpers, useFormik } from 'formik';
import { motion } from 'framer-motion';

export const VeriFormPage = (): JSX.Element => {
  const EventDetailValues = {
    eventName: '',
    organizer: '',
    organizerEmail: '',
    eventDuration: undefined,
  };
  const VeriDetailValues = {
    artwork: '',
    description: '',
  };

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().trim().required('This field is required'),
    organizer: Yup.string().trim().required('This field is required'),
    organizerEmail: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    artwork: Yup.string().trim().required('This field is required'),
    description: Yup.string().trim().required('This field is required'),
    distributionMethod: Yup.string().trim().required('This field is required'),
    recipients: Yup.array().of(Yup.string()).min(1),
  });

  const handleSubmit = (
    values: VeriFormValues,
    actions: FormikHelpers<VeriFormValues>,
  ) => {
    console.log('hi');
    console.log(values);
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      ...EventDetailValues,
      ...VeriDetailValues,
      recipients: [''],
      distributionMethod: 'QR-code',
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

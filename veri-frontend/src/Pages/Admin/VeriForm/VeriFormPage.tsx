import { Container, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormValues, VeriFormikType } from '../../../types/veris';
// import { FormikProvider, useFormik } from 'formik';
// import EventDetailForm from '../../../design-system/molecules/EventDetailForm';
import * as Yup from 'yup';
import AddVeri from '../../../design-system/organisms/AddVeri';
import { FormikHelpers } from 'formik';
// import VeriDetailForm from '../../../design-system/molecules/VeriDetailForm';
// import DistributionMethodForm from '../../../design-system/molecules/DistributionMethodForm';
// import RecipientsForm from '../../../design-system/molecules/RecipientsForm';

export const VeriFormPage = (): JSX.Element => {
  const EventDetailValues = {
    eventName: '',
    organizer: '',
    organizerEmail: '',
    eventDuration: '',
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
    eventDuration: Yup.string().trim().required('This field is required'),
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
    console.log(actions);
  };

  const veriDefaultValue: VeriFormikType = {
    initialValues: {
      ...EventDetailValues,
      ...VeriDetailValues,
      recipients: [''],
      distributionMethod: 'QR code scanner',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  };

  return (
    <Container maxW="2xl">
      <Stack justifyContent="space-between">
        <Heading mb={10}>Create New VERI</Heading>
        <VeriContext.Provider value={veriDefaultValue}>
          <AddVeri />
        </VeriContext.Provider>
      </Stack>
    </Container>
  );
};

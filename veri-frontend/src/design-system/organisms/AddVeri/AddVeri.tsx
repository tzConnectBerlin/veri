import { Button, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import DistributionMethodForm from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import RecipientsForm from '../../molecules/RecipientsForm';
import VeriDetailForm from '../../molecules/VeriDetailForm';

export const AddVeri = () => {
  const context = useContext(VeriContext);

  return (
    <Formik
      initialValues={context.formik.initialValues}
      validationSchema={context.formik.validationSchema}
      onSubmit={context.formik.onSubmit}
    >
      <Form>
        <Stack gap={8}>
          <EventDetailForm title="EVENT DETAILS" />
          <VeriDetailForm title="VERI DETAILS" />
          <DistributionMethodForm title="Distribution Method" />
          <RecipientsForm title="Recipients" />
          <Button
            type="submit"
            colorScheme="primary"
            isDisabled={!context.formik.isValid}
          >
            Save
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

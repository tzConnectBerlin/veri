import { Container, Heading, Stack } from '@chakra-ui/react';
import { Formik, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import RecipientsForm from '../../../design-system/molecules/RecipientsForm';

export const SendVerisPage = () => {
  const handleSubmit = () => {
    console.log('submit');
  };

  const initialValues = {
    recipients: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW="2xl">
        <Stack justifyContent="space-between">
          <Heading mb={10}>Send VERIs</Heading>
          <form>
            <RecipientsForm recipients={formik.values.recipients} />
          </form>
        </Stack>
      </Container>
    </motion.div>
  );
};

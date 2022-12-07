import { Box, Button, Container, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikValues, useFormik } from 'formik';
import { motion } from 'framer-motion';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getRecipientsByVeriId } from '../../../api/services/recipientsService';
import { getVeriById, getVeris } from '../../../api/services/veriService';
import RecipientsForm from '../../../design-system/molecules/RecipientsForm';
import { RecipientsVeri, VeriDropDown } from '../../../types';
import { MapVeriToDropDown } from '../../../utils/veri';

export const SendVerisPage = () => {
  const { veri_id } = useParams();

  const [veriList, setVeriList] = useState<VeriDropDown[]>([]);
  const [selectedVeri, setSelectedVeri] = useState<VeriDropDown>();
  const [recipients, setRecipients] = useState<string[]>([]);

  useEffect(() => {
    getVeris()
      .then(res => {
        setVeriList(() => MapVeriToDropDown(res.data.data));
      })
      .catch(err => console.log(err));

    if (veri_id) {
      getRecipientsByVeriId(Number(veri_id))
        .then(res => {
          setRecipients(res.data.data);
        })
        .catch(err => console.log(err));
      setSelectedVeri(
        () => veriList?.filter(item => item.id === Number(veri_id))[0],
      );
    }
  }, [veriList, veri_id]);

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, setFieldValue: any) => {
      if (!e.target.value) {
        setRecipients([]);
        setSelectedVeri(undefined);
        return;
      }
      try {
        const veriId = e.target.value;
        getVeriById(Number(veriId))
          .then(res => {
            const rec = res.data.data.recipients;
            setRecipients(rec);
            setFieldValue('recipients', rec);
          })
          .catch(err => console.log(err));
        setFieldValue('selectedVeri', e.target.value);
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  const validationSchema = Yup.object().shape({
    selectedVeri: Yup.object().required('This field is required'),
    recipients: Yup.array().of(Yup.string()).min(1),
  });

  const initialValues: RecipientsVeri = {
    recipients: recipients,
    selectedVeri: selectedVeri,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW="2xl">
        <Stack justifyContent="space-between">
          <Heading mb={10}>Send VERIs</Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form>
                <Stack gap={8}>
                  <RecipientsForm
                    veris={veriList}
                    onVeriChange={handleChange}
                  />
                  <div>{isValid}</div>
                  <Button
                    width={80}
                    alignSelf="center"
                    colorScheme="primary"
                    leftIcon={<IoMdSend />}
                    isDisabled={isSubmitting || !(isValid && dirty)}
                  >
                    Send VERI
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Container>
    </motion.div>
  );
};

import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { getRecipientsByVeriId } from '../../../api/services/recipientsService';
import { getVeris } from '../../../api/services/veriService';
import { RecipientsForm } from '../../../design-system/molecules/RecipientsForm';
import { Recipient, RecipientsVeri, VeriDropDown } from '../../../types';
import { MapVeriToDropDown } from '../../../utils/veri';

export const SendVerisPage = () => {
  const { veri_id } = useParams();

  const [veriList, setVeriList] = useState<VeriDropDown[]>([]);
  const [selectedVeri, setSelectedVeri] = useState<VeriDropDown>();
  const [recipients, setRecipients] = useState<string[]>([]);

  const getRecipients = useCallback((id: number) => {
    getRecipientsByVeriId(id)
      .then(res => {
        setRecipients(res.data.data.map((i: Recipient) => i.recipient));
      })
      .catch(err => {
        setRecipients([]);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getVeris()
      .then(res => {
        const veriDropDownList = MapVeriToDropDown(res.data.data);
        setVeriList(veriDropDownList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (veri_id) {
      getRecipients(Number(veri_id));
      const veri = veriList?.filter(item => item.id === veri_id)[0];
      setSelectedVeri(veri);
    }
  }, [getRecipients, veriList, veri_id]);

  const handleSubmit = (values: RecipientsVeri) => {
    console.log(values);
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (!e.target.value) {
        setRecipients([]);
        setSelectedVeri(undefined);
        return;
      }

      try {
        const veri: VeriDropDown = {
          id: e.target.value,
          title: e.target.name,
          artWork: '',
        };
        setSelectedVeri(veri);
        getRecipients(Number(veri.id));
      } catch (err) {
        console.log(err);
      }
    },
    [getRecipients],
  );

  const validationSchema = Yup.object().shape({
    selectedVeri: Yup.object().required('This field is required'),
    recipients: Yup.array().of(Yup.string()).min(1),
  });

  const initialValues: RecipientsVeri = {
    recipients: recipients,
    selectedVeri,
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
            validateOnChange={true}
            enableReinitialize={true}
          >
            {({ isSubmitting, isValid }) => (
              <Form>
                <Stack gap={8}>
                  <RecipientsForm
                    veris={veriList}
                    onVeriChange={handleChange}
                  />
                  {/* <div>{JSON.stringify(isValid)}</div> */}
                  <Button
                    width={80}
                    alignSelf="center"
                    colorScheme="primary"
                    leftIcon={<IoMdSend />}
                    isDisabled={isSubmitting || !isValid}
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

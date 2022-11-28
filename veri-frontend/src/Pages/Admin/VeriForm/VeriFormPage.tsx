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
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MapServerValueToVeri,
  MapVeriToServerValue,
} from '../../../utils/veri';
import {
  addVeri,
  deleteVeriById,
  getVeriById,
} from '../../../api/services/veriService';
import { useNavigate, useParams } from 'react-router-dom';
import { VeriFormStatus } from '../../../types';

export const VeriFormPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veri, setVeri] = useState<VeriFormValues>({} as VeriFormValues);
  const [type, setType] = useState<VeriFormStatus>('Add');
  const toast = useToast();

  useEffect(() => {
    if (id) {
      getVeriById(Number(id))
        .then(res => {
          setVeri(() => MapServerValueToVeri(res.data.data));
          setType('Edit');
        })
        .catch(err => console.log(err));
    }
  }, [id]);

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
            navigate('/admin');
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
    [navigate, toast],
  );

  const handleDelete = useCallback(() => {
    deleteVeriById(Number(id))
      .then(res => {
        console.log(res);
        toast({
          title: `Veri`,
          description: 'Successfully Deleted',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate('/admin');
      })
      .catch(err => {
        console.warn(err);
        toast({
          title: 'Something went wrong.',
          description: 'Try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, [id, navigate, toast]);

  const InitialValues: VeriFormValues = useMemo(() => {
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
    return {
      ...EventDetailValues,
      ...VeriDetailValues,
      recipients: [''],
      distributionMethod: 'Post-event',
      password: '',
      status: 'Draft',
    };
  }, []);

  const getInitialData: VeriFormValues = useMemo(() => {
    if (type !== 'Add' && veri) {
      return veri;
    }
    return InitialValues;
  }, [type, veri, InitialValues]);

  const formik = useFormik({
    initialValues: getInitialData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const veriDefaultValue: VeriFormikType = {
    formik: formik,
    formType: type,
    onDelete: handleDelete,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW="2xl">
        <Stack justifyContent="space-between">
          <Heading mb={10}>
            {type === 'Add' ? 'Create New VERI' : veri.eventName + ' Veri'}
          </Heading>
          <VeriContext.Provider value={veriDefaultValue}>
            <AddVeri />
          </VeriContext.Provider>
        </Stack>
      </Container>
    </motion.div>
  );
};

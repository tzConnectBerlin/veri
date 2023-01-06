import { Badge, Box, Container, Heading, Stack } from '@chakra-ui/react';
import { VeriContext } from '../../../contexts/veri';
import { VeriFormValues, VeriFormikType } from '../../../types/veris';
import * as Yup from 'yup';
import AddVeri from '../../../design-system/organisms/AddVeri';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MapServerValueToVeri,
  MapVeriToServerValue,
} from '../../../utils/veri';
import {
  addVeri,
  updateVeri,
  deleteVeriById,
  getVeriById,
} from '../../../api/services/veriService';
import { useNavigate, useParams } from 'react-router-dom';
import { VeriFormStatus } from '../../../types';
import { ADMIN_URL } from '../../../Global';
import { useToasts } from 'react-toast-notifications';

export const VeriFormPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [veri, setVeri] = useState<VeriFormValues>();
  const [type, setType] = useState<VeriFormStatus>('Add');
  const { addToast } = useToasts();

  useEffect(() => {
    if (id) {
      getVeriById(Number(id))
        .then(res => {
          setType('View');
          setVeri(() => MapServerValueToVeri(res.data.data));
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().trim().required('This field is required'),
    organizer: Yup.string().trim().required('This field is required'),
    description: Yup.string().required('This field is required'),
    distributionMethod: Yup.string().trim().required('This field is required'),
    organizerEmail: Yup.string()
      .trim()
      .email('Should be a valid email')
      .required('This field is required'),
    artworkName: Yup.string().required('This field is required'),
  });

  const handleSubmit = useCallback(
    (values: VeriFormValues) => {
      try {
        const body = MapVeriToServerValue(values);
        if (id && veri) {
          updateVeri(body, Number(id))
            .then(res => {
              addToast(`Veri Updated`, {
                description: 'View on the list',
                appearance: 'success',
              });

              navigate(ADMIN_URL + '/');
            })
            .catch(e => {
              addToast('Something went wrong.', {
                description: 'Try again later.',
                appearance: 'error',
              });
              console.error(e);
            });
        } else {
          addVeri(body)
            .then(res => {
              setVeri(() => MapServerValueToVeri(res.data.data));
              addToast(`Veri ${values.status}`, {
                status: 'success',
              });
              setType('View');
            })
            .catch(e => {
              addToast('Something went wrong.', {
                description: 'Try again later.',
                appearance: 'error',
              });
              console.error(e);
            });
        }
      } catch (err) {
        console.error(err);
        addToast('Something went wrong.', {
          description: 'Try again later.',
          appearance: 'error',
        });
      }
    },
    [navigate, id, veri, addToast],
  );

  const handleDelete = useCallback(() => {
    if (!veri) return;
    deleteVeriById(Number(veri.id))
      .then(res => {
        console.log(res);
        addToast('Veri Successfully Deleted', {
          status: 'success',
        });
        navigate(`${ADMIN_URL}/`);
      })
      .catch(err => {
        console.warn(err);
        addToast('Something went wrong.', {
          description: 'Try again later.',
          appearance: 'error',
        });
      });
  }, [navigate, addToast, veri]);

  const handleSendVeri = useCallback(() => {
    navigate(`${ADMIN_URL}/send-veris/${id}`);
  }, [id, navigate]);

  const InitialValues: VeriFormValues = useMemo(() => {
    return {
      eventName: '',
      organizer: '',
      organizerEmail: '',
      eventDuration: 'Single',
      eventStartDate: '',
      eventEndDate: '',
      artworkName: '',
      artworkFile: undefined,
      description: '',
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

  const veriDefaultValue: VeriFormikType = useMemo(
    () => ({
      formik: formik,
      formType: type ?? 'Add',
      onDelete: handleDelete,
      onSend: handleSendVeri,
    }),
    [formik, handleDelete, type, handleSendVeri],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW="2xl">
        <Stack justifyContent="space-between">
          <Box mb={10}>
            <Heading>
              {type === 'Add' ? 'Create New VERI' : veri?.eventName + ' Veri'}
            </Heading>
            {veri && type !== 'Add' && (
              <Badge variant={veri.status.toLowerCase()}>{veri.status}</Badge>
            )}
          </Box>
          <VeriContext.Provider value={veriDefaultValue}>
            <AddVeri />
          </VeriContext.Provider>
        </Stack>
      </Container>
    </motion.div>
  );
};

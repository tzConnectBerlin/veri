import { Button, Stack, Box } from '@chakra-ui/react';
import { useContext, useCallback } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { IoMdSave, IoMdCloudUpload, IoMdSend } from 'react-icons/io';
import { DistributionMethodForm } from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import { RecipientsForm } from '../../molecules/RecipientsForm';
import { VeriDetailForm } from '../../molecules/VeriDetailForm';

export const AddVeri = () => {
  const context = useContext(VeriContext);

  const handleDifferentSubmit = useCallback(
    (status: string) => {
      context.formik.setFieldValue('status', status);
      context.formik.handleSubmit();
    },
    [context.formik],
  );

  return (
    <form>
      <Stack gap={8}>
        <EventDetailForm title="EVENT DETAILS" />
        <VeriDetailForm title="VERI DETAILS" />
        <DistributionMethodForm title="Distribution Method" />
        {context.formik.values.distributionMethod === 'Post-event' && (
          <RecipientsForm title="Recipients" />
        )}
        {/* <>{JSON.stringify(context.formik.values)}</> */}

        <Box>
          <Stack spacing={4} width={80} mx="auto">
            <Button
              colorScheme="primary"
              isDisabled={
                context.formik.isSubmitting ||
                !(context.formik.isValid && context.formik.dirty)
              }
              leftIcon={<IoMdSave />}
              onClick={() => handleDifferentSubmit('Draft')}
            >
              Save Draft
            </Button>
            <Button
              variant="secondary"
              isDisabled={
                context.formik.isSubmitting ||
                !(context.formik.isValid && context.formik.dirty)
              }
              leftIcon={<IoMdCloudUpload />}
              onClick={() => handleDifferentSubmit('Created')}
            >
              Create VERI
            </Button>
            <Button
              variant="secondary"
              isDisabled={
                context.formik.isSubmitting ||
                !(context.formik.isValid && context.formik.dirty)
              }
              leftIcon={<IoMdSend />}
              onClick={() => handleDifferentSubmit('Minting')}
            >
              Create & Mint VERIs
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

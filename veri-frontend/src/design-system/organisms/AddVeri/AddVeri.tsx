import { Button, Stack, Box } from '@chakra-ui/react';
import { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import { IoMdSave, IoMdCloudUpload, IoMdSend } from 'react-icons/io';
import { DistributionMethodForm } from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import { RecipientsForm } from '../../molecules/RecipientsForm';
import { VeriDetailForm } from '../../molecules/VeriDetailForm';

export const AddVeri = () => {
  const context = useContext(VeriContext);
  const handleSubmit = (status: string, e: any) => {
    context.formik.values.status = status;
    context.formik.handleSubmit(e);
  };

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
              type="submit"
              colorScheme="primary"
              leftIcon={<IoMdSave />}
              onClick={e => handleSubmit('Draft', e)}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="secondary"
              leftIcon={<IoMdCloudUpload />}
              onClick={e => handleSubmit('Created', e)}
            >
              Create VERI
            </Button>
            <Button
              type="submit"
              variant="secondary"
              leftIcon={<IoMdSend />}
              onClick={e => handleSubmit('Minting', e)}
            >
              Create & Mint VERIs
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

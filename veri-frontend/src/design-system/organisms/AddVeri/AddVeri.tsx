import { Button, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { VeriContext } from '../../../contexts/veri';
import DistributionMethodForm from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import RecipientsForm from '../../molecules/RecipientsForm';
import VeriDetailForm from '../../molecules/VeriDetailForm';

export const AddVeri = () => {
  const context = useContext(VeriContext);

  return (
    <form onSubmit={(e: any) => context.formik.handleSubmit(e)}>
      <Stack gap={8}>
        <EventDetailForm title="EVENT DETAILS" />
        <VeriDetailForm title="VERI DETAILS" />
        <DistributionMethodForm title="Distribution Method" />
        {context.formik.distributionMethod === 'Post-event' && (
          <RecipientsForm title="Recipients" />
        )}
        <Button type="submit" colorScheme="primary">
          Save
        </Button>
      </Stack>
    </form>
  );
};

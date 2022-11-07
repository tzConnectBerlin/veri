import { Stack } from '@chakra-ui/react';
import {
  DistributionMethodForm,
  DistributionMethodFormProps,
} from '../../molecules/DistributionMethodForm';
import { EventDetailForm } from '../../molecules/EventDetailForm';
import {
  RecipientsForm,
  RecipientsFormProps,
} from '../../molecules/RecipientsForm';
import {
  VeriDetailForm,
  VeriDetailFormProps,
} from '../../molecules/VeriDetailForm';

export const AddVeri = () => {
  const VeriDetailValues: VeriDetailFormProps = {
    title: 'Veri DETAILS',
    onSubmit: () => console.log('hello'),
    initialValues: {
      artwork: '',
      description: '',
    },
    eventName: '',
  };

  const DistributedMethonValues: DistributionMethodFormProps = {
    title: 'Distribution Method',
    onSubmit: () => console.log('hello'),
    initialValues: {
      distributionMethod: 'QR code scanner',
    },
  };

  const RecipientsValues: RecipientsFormProps = {
    title: 'Distribution Method',
    onSubmit: () => console.log('hello'),
    initialValues: {
      recipients: [],
    },
  };
  return (
    <Stack gap={8}>
      <EventDetailForm title="EVENT DETAILS" />
      <VeriDetailForm {...VeriDetailValues} />
      <DistributionMethodForm {...DistributedMethonValues} />
      <RecipientsForm {...RecipientsValues} />
    </Stack>
  );
};

import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { AddVeri } from '../../../design-system/organisms/AddVeri';
import { VeriContext } from '../../../contexts/veri';
import { VeriContextType } from '../../../types/veris';

export const VeriFormPage = (): JSX.Element => {
  const handleSubmit = () => {
    console.log('submit');
  };

  const EventDetailValues = {
    eventName: '',
    organizer: '',
    organizerEmail: '',
    eventDuration: '',
  };
  const VeriDetailValues = {
    artwork: '',
    description: '',
  };
  const veriDefaultValue: VeriContextType = {
    EventDetailValues,
    VeriDetailValues,
    recipients: [''],
    distributionMethod: 'QR code scanner',
    onSubmit: () => handleSubmit(),
  };

  return (
    <Container maxW="2xl">
      <Stack justifyContent="space-between">
        <Heading mb={10}>Create New VERI</Heading>
        <VeriContext.Provider value={veriDefaultValue}>
          <AddVeri />
          <Button onClick={handleSubmit}>Save</Button>
        </VeriContext.Provider>
      </Stack>
    </Container>
  );
};

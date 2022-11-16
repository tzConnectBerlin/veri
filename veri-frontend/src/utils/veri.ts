import { VeriFormValues } from '../types/veris';

export const MapVeriToServerValue = (veri: VeriFormValues) => {
  console.log(veri);
  return {
    event_name: veri.eventName,
    event_description: veri.description,
    event_contact_email: veri.organizerEmail,
    event_type: veri.eventDuration,
    event_start_date: new Date(),
    event_end_date: '',
    artwork_name: veri.artwork?.name,
    artwork_description: veri.description,
    artwork_file: veri.artwork,
    live_distribution: veri.distributionMethod === 'QR-code' ? true : false,
    live_distribution_url: 'test',
    live_distribution_password: 'test',
    status: veri.status,
    recipients: veri.recipients,
  };
};

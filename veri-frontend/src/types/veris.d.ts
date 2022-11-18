import { FormikProps } from 'formik';

export const VeriStatus = ['Draft', 'Created', 'Minting', 'Minted'];

export interface EventDetailValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration: 'Single' | 'Multiday';
  eventStartDate: string;
  eventEndDate: string;
}

export interface VeriDetailValues {
  description?: string;
  artworkFile?: File;
  artworkName: string;
}

export interface VeriFormValues extends EventDetailValues, VeriDetailValues {
  recipients: string[];
  distributionMethod?: 'QR-code' | 'Post-event';
  password?: string;
  status: string;
}

export interface VeriFormikType {
  formik: FormikProps<VeriFormValues>;
}

export interface AddVeriType {
  event_name: string;
  event_description?: string;
  event_contact_email: string;
  event_type: 'Single' | 'Multiday';
  event_start_date: Date;
  event_end_date: Date;
  artwork_name: string;
  artwork_description?: string;
  artwork_file: File;
  live_distribution: boolean;
  live_distribution_url: string;
  live_distribution_password: string;
  status: string;
  recipients: string[];
}

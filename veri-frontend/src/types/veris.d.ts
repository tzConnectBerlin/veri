import { FormikProps } from 'formik';

export const VeriStatus = ['Draft', 'Created', 'Minting', 'Minted'];

export interface EventDetailValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration?: 'Single' | 'multiday';
}

export interface VeriDetailValues {
  description: string;
  artwork?: File;
  artworkName: string;
}

export interface VeriFormValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration?: 'Single' | 'multiday';
  artworkName: string;
  artworkFile?: File;
  description?: string;
  recipients: string[];
  distributionMethod?: 'QR-code' | 'Post-event';
  status: string;
}

export interface VeriFormikType {
  formik: FormikProps;
}

export interface AddVeriType {
  event_name: string;
  event_description?: string;
  event_contact_email: string;
  event_type: 'Single' | 'multiday';
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

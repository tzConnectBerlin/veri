import { FormikProps } from 'formik';

export type VeriFormStatus = 'Add' | 'Edit' | 'View';

export interface VeriFormValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration: 'Single' | 'Multiday';
  eventStartDate: string;
  eventEndDate: string;
  description?: string;
  artworkFile?: File;
  artworkName: string;
  distributionMethod?: 'QR-code' | 'Post-event';
  password?: string;
  status: string;
}

export interface VeriFormikType {
  formik: FormikProps<VeriFormValues>;
  formType: VeriFormStatus;
  onDelete: () => void;
  onSend: () => void;
}

export interface VeriFormType {
  id: string;
  event_name: string;
  organizer?: string;
  organizer_email: string;
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
}

export interface VeriListType {
  id: string;
  thumbnail: string;
  veri: string;
  organizer?: string;
  event_start_date: string;
  event_end_date: string;
  status: string;
}

export interface VeriDropDown {
  id: string;
  artWork: string;
  title: string;
}

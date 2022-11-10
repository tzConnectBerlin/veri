import { FormikProps } from 'formik';

export enum VeriStatus {
  Draft,
  Created,
  Minting,
  Minted,
}

export interface EventDetailValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration?: 'single' | 'multi';
}

export interface VeriDetailValues {
  artwork: string;
  description: string;
}

export interface VeriFormValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration?: 'single' | 'multi';
  artwork: string;
  description: string;
  recipients: string[];
  distributionMethod?: 'QR-code' | 'Post-event';
}

export interface VeriFormikType {
  formik: FormikProps;
}

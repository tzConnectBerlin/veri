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
  eventDuration?: string;
}

export interface VeriDetailValues {
  artwork: string;
  description: string;
}

export interface VeriFormValues {
  eventName: string;
  organizer: string;
  organizerEmail: string;
  eventDuration?: string;
  artwork: string;
  description: string;
  recipients: string[];
  distributionMethod?: 'QR code scanner' | 'Post-event drop';
}

export interface VeriFormikType {
  formik: FormikProps;
}

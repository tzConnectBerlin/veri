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

export interface VeriContextType {
  EventDetailValues: EventDetailValues;
  VeriDetailValues: VeriDetailValues;
  recipients: string[];
  distributionMethod?: 'QR code scanner' | 'Post-event drop';
  onSubmit: () => void;
}

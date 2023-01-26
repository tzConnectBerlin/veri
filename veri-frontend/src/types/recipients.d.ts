import { VeriDropDown } from './index';

export interface RecipientsVeri {
  recipients: string[];
  selectedVeri?: VeriDropDown;
}

export interface Recipient {
  image: string;
  operation?: string;
  recipient: string;
  status: string;
  veri: string;
}
export interface EventAuth {
  name: string;
  password: string;
}

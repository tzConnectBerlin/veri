import { string } from 'prop-types';
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

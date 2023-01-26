import { createContext } from 'react';
import { VeriFormikType } from '../types/veris';

export const VeriContext = createContext<VeriFormikType>({} as VeriFormikType);

import { createContext } from 'react';
import { VeriContextType } from '../types/veris';

export const VeriContext = createContext<VeriContextType>(
  {} as VeriContextType,
);

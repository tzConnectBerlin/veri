import React, { useCallback, useState } from 'react';
import { ScannerContainer } from '../../design-system/molecules/ScannerContainer';

export const ScannerPage = () => {
  const [hasError, setHasError] = useState(false);
  const [tzAddress, setTzAddress] = useState('');
  const handleScan = useCallback((scanData: string) => {
    if (scanData) {
      setTzAddress(scanData);
    }
  }, []);

  const handleError = useCallback((err: any) => {
    setHasError(true);
  }, []);
  return <ScannerContainer handleScan={handleScan} handleError={handleError} />;
};

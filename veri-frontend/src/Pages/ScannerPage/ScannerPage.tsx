import React, { useCallback } from 'react';
import Scanner from '../../design-system/atoms/Scanner';

export const ScannerPage = () => {
  const handleScan = useCallback((val: string) => {
    console.log(val);
  }, []);

  const handleError = useCallback((err: any) => {
    console.info(err);
  }, []);
  return <Scanner handleScan={handleScan} handleError={handleError} />;
};

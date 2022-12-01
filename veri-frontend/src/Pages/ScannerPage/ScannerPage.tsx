import React, { useCallback, useState } from 'react';
import { ScannerContainer } from '../../design-system/molecules/ScannerContainer';
import { messageType } from '../../design-system/molecules/ScannerContainer/ScannerContainer';

export const ScannerPage = () => {
  const [tzAddress, setTzAddress] = useState('');
  const [message, setMessage] = useState<messageType>();

  const handleScan = useCallback(
    (scanData: string) => {
      if (scanData && scanData !== tzAddress) {
        setTzAddress(scanData);
        console.log(scanData);
        setMessage({
          type: 'Success',
          msg: 'Your NFT gifts are on their way.',
        });
        refreshPage();
      }
    },
    [tzAddress],
  );

  const refreshPage = () => {
    setTimeout(() => {
      setMessage({});
    }, 3000);
  };

  return <ScannerContainer handleScan={handleScan} resultMsg={message} />;
};

import React, { useCallback, useState } from 'react';
import Scanner from '../../design-system/atoms/Scanner';
import { messageType } from '../../design-system/atoms/Scanner/Scanner';

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
      setMessage(undefined);
    }, 3000);
  };

  return <Scanner handleScan={handleScan} resultMsg={message} />;
};

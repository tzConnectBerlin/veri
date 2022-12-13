import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Scanner from '../../design-system/atoms/Scanner';
import { validateAddress } from '@taquito/utils';
import { messageType } from '../../design-system/atoms/Scanner/Scanner';

export const ScannerPage = () => {
  const [tzAddress, setTzAddress] = useState('');
  const [message, setMessage] = useState<messageType>();
  const params = useParams();

  const sendData = (address: string) => {
    setTzAddress(address);
    //console.log(scanData);
    setMessage({
      type: 'Success',
      msg: 'Your NFT gifts are on their way.',
    });
    refreshPage();
  };

  const handleScan = (scanData: string) => {
    console.log(scanData);
    setMessage({
      type: 'Processing',
    });
    if (scanData && scanData !== tzAddress) {
      sendData(scanData);
    }
  };

  const handleError = useCallback((err: any) => {
    console.log(err);
    setMessage({
      type: 'Error',
      msg: 'Somethig is wrong!',
    });
    refreshPage();
  }, []);

  const refreshPage = () => {
    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  };
  console.log(params);
  return (
    <Scanner
      handleScan={handleScan}
      handleError={handleError}
      resultMsg={message}
    />
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Scanner from '../../design-system/atoms/Scanner';
import { messageType } from '../../design-system/atoms/Scanner/Scanner';
import { postScanByVeriId } from '../../api/services/recipientsService';
import { isValidAddress } from '../../utils/general';

export const ScannerPage = () => {
  const [tzAddress, setTzAddress] = useState('');
  const [message, setMessage] = useState<messageType>();
  const [veriId, setVeriId] = useState();
  const location = useLocation();

  const sendData = (address: string) => {
    setTzAddress(address);
    const body = {
      addresses: address.toString(),
    };
    postScanByVeriId(Number(veriId), body)
      .then(() => {
        setMessage({
          type: 'Success',
          msg: 'Your NFT gifts are on their way.',
        });
      })
      .catch(err => {
        setMessage({
          type: 'Error',
          msg: 'Something is wrong',
        });
        console.error(err);
      });
  };

  const handleScan = (scanData: string) => {
    setMessage({
      type: 'Processing',
    });
    if (scanData && scanData !== tzAddress) {
      if (!isValidAddress(scanData)) {
        setMessage({
          type: 'Error',
          msg: 'Address is not valid!',
        });
        return;
      }
      sendData(scanData);
    }
  };

  const handleError = useCallback((err: any) => {
    console.log(err);
    setMessage({
      type: 'Error',
      msg: err.message || 'Somethig is wrong!',
    });
  }, []);

  useEffect(() => {
    setVeriId(location.state);
  }, [location.state]);

  return (
    <Scanner
      handleScan={handleScan}
      handleError={handleError}
      resultMsg={message}
    />
  );
};

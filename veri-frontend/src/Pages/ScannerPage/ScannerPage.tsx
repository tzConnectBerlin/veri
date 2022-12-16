import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Scanner from '../../design-system/atoms/Scanner';
import { validateAddress } from '@taquito/utils';
import { messageType } from '../../design-system/atoms/Scanner/Scanner';
import { postRcipientsByVeriId } from '../../api/services/recipientsService';

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
    postRcipientsByVeriId(Number(veriId), body)
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

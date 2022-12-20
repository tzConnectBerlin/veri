import { Box, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';

const ScanContainer = styled(Box)`
  width: 100%;
  height: 100%;
  margin: auto;
  max-width: 648px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;

  &.Error {
    background-color: #cc2800;
  }
  &.Processing {
    background-color: #c5cc00;
  }
  &.Success {
    background-color: #00cc1b;
  }
`;

const QRScanner = styled(QrReader)`
  &,
  & > * {
    width: 100%;
    height: 100%;
    padding-top: 0 !important;
  }

  div {
    border: 3em solid rgba(0, 0, 0, 0.3);
    box-shadow: none !important;
    &,
    &:before {
      top: 0px;
      left: 0px;
      z-index: 1;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    &:before {
      content: '';
      --b: 5px; /* thickness*/
      --c: white; /* color*/
      --w: 40px; /* width*/

      border: var(--b) solid #0000; /* space for the border */
      --_g: #0000 90deg, var(--c) 0;
      --_p: var(--w) var(--w) border-box no-repeat;
      background: conic-gradient(
            from 90deg at top var(--b) left var(--b),
            var(--_g)
          )
          0 0 / var(--_p),
        conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g))
          100% 0 / var(--_p),
        conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0
          100% / var(--_p),
        conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g))
          100% 100% / var(--_p);
    }
  }
`;

const ViewContainer = styled.div`
  border: 3em solid rgba(0, 0, 0, 0.3);
  &,
  &:before {
    top: 0px;
    left: 0px;
    z-index: 1;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &:before {
    content: '';
    --b: 5px; /* thickness*/
    --c: white; /* color*/
    --w: 40px; /* width*/

    border: var(--b) solid #0000; /* space for the border */
    --_g: #0000 90deg, var(--c) 0;
    --_p: var(--w) var(--w) border-box no-repeat;
    background: conic-gradient(
          from 90deg at top var(--b) left var(--b),
          var(--_g)
        )
        0 0 / var(--_p),
      conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) 100%
        0 / var(--_p),
      conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0
        100% / var(--_p),
      conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g))
        100% 100% / var(--_p);
  }
`;

export interface messageType {
  type?: 'Error' | 'Success' | 'Processing';
  msg?: string;
}
export interface ScannerProps {
  handleScan: (data: string) => void | Promise<void>;
  handleError: (err: any) => void;
  resultMsg?: messageType;
}

export const Scanner: React.FC<ScannerProps> = ({
  handleScan,
  handleError,
  resultMsg,
}) => {
  const [message, setMessage] = useState<messageType>();

  useEffect(() => {
    setMessage(resultMsg);
  }, [resultMsg]);

  const onReadResult = (result: any) => {
    if (!result) return;
    handleScan(result);
  };

  return (
    <ScanContainer className={resultMsg?.type}>
      {message ? (
        <Box>
          <Heading>
            {message?.type}
            {message?.type === 'Processing' ? '...' : '!'}
          </Heading>
          <Text>{message.msg}</Text>
        </Box>
      ) : (
        <QRScanner
          delay={100}
          facingMode="user"
          onError={handleError}
          onScan={onReadResult}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </ScanContainer>
  );
};

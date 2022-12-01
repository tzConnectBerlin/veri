import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { QrReader } from 'react-qr-reader';

const QRScanner = styled(QrReader)`
  & > * {
    height: 100%;
    padding-top: 0 !important;
  }
`;

export interface ScannerProps {
  handleScan: (data: string) => void | Promise<void>;
  handleError: (err: any) => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  handleScan,
  handleError,
}) => {
  const onScan = (result?: any, error?: any) => {
    if (result) {
      handleScan(result?.text);
    }

    if (error) {
      handleError(error);
    }
  };

  return (
    <Box>
      <QrReader
        constraints={{ facingMode: 'user' }}
        scanDelay={100}
        onResult={onScan}
      />
    </Box>
  );
};

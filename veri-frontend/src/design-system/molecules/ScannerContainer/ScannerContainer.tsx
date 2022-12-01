import { Box, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Scanner } from '../../atoms/Scanner';

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

export interface messageType {
  type?: 'Error' | 'Success' | 'Processing';
  msg?: string;
}

export interface ScannerContainerProps {
  handleScan: (data: string) => void | Promise<void>;
  resultMsg?: messageType;
}

export const ScannerContainer: React.FC<ScannerContainerProps> = ({
  handleScan,
  resultMsg,
}) => {
  const [message, setMessage] = useState<messageType>();

  useEffect(() => {
    setMessage(resultMsg);
  }, [resultMsg]);

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
        <Scanner handleScan={handleScan} />
      )}
    </ScanContainer>
  );
};

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
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

export interface ScannerContainerProps {
  handleScan: (data: string) => void | Promise<void>;
  handleError: (err: any) => void;
}

export const ScannerContainer: React.FC<ScannerContainerProps> = ({
  handleScan,
  handleError,
}) => {
  return (
    <ScanContainer>
      <Scanner handleScan={handleScan} handleError={handleError} />
    </ScanContainer>
  );
};

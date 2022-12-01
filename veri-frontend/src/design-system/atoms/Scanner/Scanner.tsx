import styled from '@emotion/styled';
import { QrReader } from 'react-qr-reader';

const QRScanner = styled(QrReader)`
  &,
  & > * {
    width: 100%;
    height: 100%;
    padding-top: 0 !important;
  }
`;

const ViewContainer = styled.div`
  border: 80px solid rgba(0, 0, 0, 0.3);
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
    <QRScanner
      constraints={{ facingMode: 'user' }}
      scanDelay={100}
      onResult={onScan}
      ViewFinder={() => <ViewContainer />}
    />
  );
};

import React from "react";
import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import QrReader from "react-qr-reader";

const Logo = styled.img`
  margin: auto;
  width: 13rem;
  display: block
`;

const ScanContainer = styled(Box)`
    width: 10rem;
    padding: 1rem;
    margin: 1rem auto;
`;

const MainContainer = styled(Container)`
    padding: 2rem;
`;

const App = () => {
  const [scanData, setScanData] = React.useState();

  const handleScan = (data: any) => {
    if (data) {
      setScanData(data);
    }
  };
  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="App">
      <MainContainer>
        <Logo src="./Logo.svg" />
        <ScanContainer>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
        </ScanContainer>
        {scanData}
      </MainContainer>
    </div>
  );
};

export default App;

import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import QrReader from "react-qr-reader";
import axios from "axios";

const Logo = styled.img`
  margin: auto;
  width: 13rem;
  display: block;
`;

const ScanContainer = styled(Box)`
  width: 100%;
  padding: 2rem 0;
  margin: auto;
  max-width: 400px;
`;

const MainContainer = styled(Container)`
  padding: 2rem;
`;

const App = () => {
  const [scanData, setScanData] = React.useState();
  const [message, setMessage] = React.useState("");

  const handleScan = (data: any) => {
    if (data) {
      setScanData(data);
      try {
        axios
          .get(`https://veri.tzconnect.berlin/dyn/add.cgi?key=${data}`)
          .then((res) => {
            setMessage("Successfully submited the code.");
            console.log(res);
          })
          .catch((err) => {
            setMessage("Something went wrong");
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleError = (err: any) => {
    setMessage("Something went wrong");
    console.error(err);
  };

  return (
    <div className="App">
      <MainContainer>
        <Logo src="./Logo.svg" />
        {message.length > 0 ? (
          <Typography my={4} textAlign="center">
            {message}
          </Typography>
        ) : (
          <ScanContainer>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          </ScanContainer>
        )}
      </MainContainer>
    </div>
  );
};

export default App;

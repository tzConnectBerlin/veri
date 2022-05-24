import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Grow, Typography } from "@mui/material";
import QrReader from "react-qr-reader";
import axios from "axios";
import { Loading } from "./Loading";
import { TransitionGroup } from "react-transition-group";
import { validateAddress } from "@taquito/utils";

const ScanContainer = styled(Box)`
  width: 100%;
  padding: 2rem 0;
  margin: auto;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  .MuiBox-root {
    width: 100%;
    height: 100%;
  }
  div {
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 5px inset !important;
  }
`;

const MainContainer = styled(Container)`
  padding: 2rem;
  border-box: box-sizing;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .error {
    color: #d32f2f;
  }
`;

const Scanner = styled(QrReader)`
  & > * {
    height: 100%;
    padding-top: 0 !important;
  }
`;

const Logo = styled.img`
  margin:  2rem auto;
  width: 13rem;
  display: block;
`;

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [msgLoaded, setMsgLoaded] = React.useState(false);
  const [scannerLoaded, setScannerLoaded] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleTransitions = (msgData: boolean = false) => {
    setMsgLoaded(msgData);
    setScannerLoaded(!msgData);
  };

  const handleScan = (data: any) => {
    if (data) {
      const scanData = data.substring(data.lastIndexOf("/") + 1);
      const validation = validateAddress(scanData);
      if( validation === 3) {
        try {
          handleTransitions(true);
          axios
            .get(`https://veri.tzconnect.berlin/dyn/add.cgi?key=${scanData}`)
            .then((res) => {
              setMessage("Successfully submited the code.");
              setMessageType("succeed");
            })
            .catch((err) => {
              setMessage("Something went wrong");
              setMessageType("error");
            })
            .finally(() => refreshPage());
        } catch (error) {
          console.log(error);
        }
      }
      else{
        handleTransitions(true);
        setMessage("Wallet address is not valid");
        setMessageType("error");
      }

     
    }
  };

  const handleError = (err: any) => {
    handleTransitions(true);
    setMessage("Unable to scan the code");
    setMessageType("error");
    console.error(err);
    refreshPage();
  };

  const refreshPage = () => {
    setTimeout(() => {
      handleTransitions(false);
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <MainContainer>
      <Logo src="./Logo.svg" />
      {loading && <Loading />}
      <ScanContainer>
        <TransitionGroup>
          <Grow in={msgLoaded}>
            <Typography align="center" variant="h5" className={messageType}>
              {message}
            </Typography>
          </Grow>
        </TransitionGroup>
        <Grow in={scannerLoaded}>
          <Box>
            <Scanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              onImageLoad={() => setLoading(true)}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Grow>
      </ScanContainer>
    </MainContainer>
  );
};

export default App;

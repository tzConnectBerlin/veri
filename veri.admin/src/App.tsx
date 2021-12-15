import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import QrReader from "react-qr-reader";
import axios from "axios";
import { Loading } from "./Loading";

const Logo = styled.img`
  margin:  2rem auto;
  width: 13rem;
  display: block;
`;

const ScanContainer = styled(Box)`
  width: 100%;
  padding: 2rem 0;
  margin: auto;
  max-width: 400px;
  div {
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 5px inset !important;
  }
`;

const MainContainer = styled(Container)`
  padding: 2rem;
  .error {
    color: #d32f2f;
  }
`;

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleScan = (data: any) => {
    if (data) {
      const scanData = data.substring(data.lastIndexOf("/") + 1);
      setLoading(true);
      try {
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
      setLoading(false);
    }
  };

  const handleError = (err: any) => {
    setMessage("Unable to scan the code");
    setMessageType("error");
    console.error(err);
    refreshPage();
  };

  const refreshPage = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <div className="App">
      <MainContainer>
        <Logo src="./Logo.svg" />
        {loading && <Loading />}
        {message.length > 0 ? (
          <Typography
            my={8}
            align="center"
            variant="h5"
            className={messageType}
          >
            {message}
          </Typography>
        ) : (
          <ScanContainer>
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              onImageLoad={() => setLoading(true)}
              style={{ width: "100%" }}
            />
          </ScanContainer>
        )}
      </MainContainer>
    </div>
  );
};

export default App;

import React from "react";
import styled from "@emotion/styled";
import { Box, Grow, Typography } from "@mui/material";
import QrReader from "react-qr-reader";
import axios from "axios";
import { validateAddress } from "@taquito/utils";

const ScanContainer = styled(Box)`
  width: 100%;
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
  p {
    margin: 0;
  }

  .MuiBox-root {
    width: 100%;
    height: 100%;
  }

  div {
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 0px 5px inset !important;
  }
`;

const QRScanner = styled(QrReader)`
  & > * {
    height: 100%;
    padding-top: 0 !important;
  }
`;

interface msgType {
  type?: "Error" | "Success" | "Processing";
  msg?: string;
}
export const Scanner: React.FC = () => {
  const [msgLoaded, setMsgLoaded] = React.useState(false);
  const [scannerLoaded, setScannerLoaded] = React.useState(true);
  const [message, setMessage] = React.useState<msgType>();
  const BaseUrl = "http://veri.tzconnect.berlin/mint?destination=";
  // const BaseUrl = "http://65.108.212.0:4242/mint?destination=";

  const handleTransitions = (msgData: boolean = false) => {
    setMsgLoaded(msgData);
    setScannerLoaded(!msgData);
  };

  const handleResponse = (data: string) => {
    switch (data) {
      case "RED": {
        setMessage({
          type: "Error",
          msg: "You already have this VERI.",
        });
        break;
      }
      case "GREEN": {
        setMessage({
          type: "Success",
          msg: "A VERI is on its way.",
        });
        break;
      }
      case "YELLOW": {
        setMessage({
          type: "Processing",
        });
        break;
      }
    }
  };

  const handleScan = (data: any) => {
    if (data) {
      handleTransitions(true);
      setMessage({
        type: "Processing",
      });
      const scanData = data.substring(data.lastIndexOf("/") + 1);
      const validation = validateAddress(scanData);
      if (validation === 3) {
        try {
          axios
            .get(BaseUrl + scanData)
            .then((res) => {
              setTimeout(() => {
                handleResponse(res.data);
              }, 1000);
            })
            .catch((err) => {
              setTimeout(() => {
                setMessage({
                  type: "Error",
                  msg: "Something went wrong.",
                });
                console.log(err);
              }, 1000);
            })
            .finally(() => refreshPage());
        } catch (error) {
          handleTransitions(true);
          console.log(error);
        }
      } else {
        setMessage({
          type: "Error",
          msg: "Not a valid Tezos wallet address.",
        });
        refreshPage();
      }
    }
  };

  const handleError = (err: any) => {
    handleTransitions(true);
    setMessage({
      type: "Error",
      msg: "Unable to scan the code.",
    });
    refreshPage();
  };

  const refreshPage = () => {
    setTimeout(() => {
      handleTransitions(false);
      setMessage({});
    }, 3000);
  };
  return (
    <ScanContainer className={message?.type}>
      {msgLoaded && (
        <Typography align="center" variant="h4">
          <p>
            {message?.type}
            {message?.type === "Processing" ? "..." : "!"}
          </p>
          {message?.msg}
        </Typography>
      )}
      {scannerLoaded && (
        <Box>
          <QRScanner
            delay={100}
            facingMode="user"
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      )}
    </ScanContainer>
  );
};

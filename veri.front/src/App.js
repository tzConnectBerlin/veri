import "./App.css";
import styled from "@emotion/styled";

import { RPC_URL, NETWORK } from "./config";
import { useEffect, useState } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { Button, TextField, Stack } from "@mui/material";
import { NetworkType } from "@airgap/beacon-sdk";
import axios from "axios";
var QRCode = require("qrcode.react");

const StyledPageWrapper = styled(Stack)`
  padding-left: 10rem;
  padding-right: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  @media (max-width: 900px) {
    padding-left: 8rem;
    padding-right: 8rem;
  }

  @media (max-width: 600px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Logo = styled.img`
  margin: auto;
  width: 15rem;
`;

const StackHeader = styled(Stack)`
  top: 10rem;
  position: absolute;
  align-items: center;
  margin: auto;
  transition: top 0.2s;

  @media (max-width: 900px) {
    top: 6rem;
  }

  @media (max-width: 600px) {
    top: 2rem;
  }
`;

const StyledIntro = styled.p`
  margin: auto;
  margin-top: 2rem !important;
  width: 45%;
  transition: width 0.2s;

  @media (max-width: 900px) {
    width: 65%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StyledInput = styled(TextField)`
  margin-top: 3rem;
  max-width: 10rem;
`;

const StyledButton = styled(Button)`
  min-width: 10rem;
  margin-top: 4rem !important;
  margin: auto;

  color: black;
  background-color: white;

  border-radius: 2rem;

  :hover {
    background-color: white;
    outline: 2px solid black;
  }

  :active {
    background-color: white;
    outline: 2px solid #c4c4c4;
  }
`;

const StyledQRCode = styled(QRCode)`
  margin-top: 4rem !important;
  margin: auto;
`;

function App() {
  const [beaconLoading, setBeaconLoading] = useState(false);
  const [beaconWallet, setBeaconWallet] = useState();

  const [userAddress, setUserAddress] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userFullNameError, setUserFullNameError] = useState(false);
  const [userFullNameHelperText, setUserFullNameHelperText] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    initTezos();
    setBeaconWallet(initWallet());
    setBeaconLoading(true);
  }, []);

  useEffect(() => {
    if (beaconWallet) {
      checkIfAlreadyConnected();
    }
    setBeaconLoading(false);
  }, [beaconWallet]);

  const checkIfAlreadyConnected = async () => {
    const activeAccount = await beaconWallet.client.getActiveAccount();

    if (activeAccount) {
      setUserAddress(activeAccount.address);
    }
  };

  const initTezos = (url = RPC_URL) => {
    const Tezos = new TezosToolkit(url);
    const beaconWallet = initWallet();
    Tezos.setWalletProvider(beaconWallet);
  };

  const initWallet = () => {
    const options = {
      name: "Veri",
      iconUrl: "https://tezostaquito.io/img/favicon.png",
      preferredNetwork: NetworkType[NETWORK],
    };

    return new BeaconWallet(options);
  };

  const requestUserWalletPermission = async (loginType) => {
    debugger;
    if (!userFullName || userFullName.length < 3) {
      setUserFullNameHelperText(
        "Name should be provided and minimum 3 characters."
      );
      return setUserFullNameError(true);
    }
    if (beaconWallet && loginType === "beacon") {
      setBeaconLoading(true);
      try {
        const permissions = await beaconWallet.client.requestPermissions({
          network: {
            type: NetworkType[NETWORK],
          },
        });

        setUserAddress(permissions.address);

        axios
          .get(
            `https://pop.tzconnect.berlin/dyn/add.cgi?name=${userFullName}&key=${permissions.address}`
          )
          .then((res) => {
            debugger;
            setUserFullName("");
            setUserFullNameError(false);
            setUserFullNameHelperText("");
            setSuccessMessage(
              "Successfully submited your proof of attendancy."
            );
            console.log(res);
          })
          .catch((err) => {
            setUserFullName("");
            setUserFullNameError(false);
            setUserFullNameHelperText("");
            setSuccessMessage("Something went wrong");
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }

      setBeaconLoading(false);
    }
  };

  const ariaLabel = { "aria-label": "description" };

  const handleChamgeName = (event) => {
    setUserFullName(event.currentTarget.value);
    setUserFullNameError(false);
    setUserFullNameHelperText("");
  };

  return (
    <div className="App">
      <StyledPageWrapper direction="column">
        <StackHeader direction="column">
          <Logo src="./Logo.svg" />
          <StyledIntro>
            Formally verified is a new way of keeping a reliable record of life
            experiences. Each time they take part on an event, Formally verified
            collectors get a unique badge that is supported by a cryptographic
            record.
          </StyledIntro>
          {!userAddress ? (
            <>
              <StyledInput
                error={userFullNameError}
                variant="standard"
                helperText={userFullNameHelperText}
                placeholder="Full Name"
                inputProps={ariaLabel}
                value={userFullName}
                onChange={(event) => handleChamgeName(event)}
              />

              <StyledButton
                variant="contained"
                onClick={() =>
                  beaconLoading ? {} : requestUserWalletPermission("beacon")
                }
                loading={beaconLoading}
                disable={beaconLoading}
              >
                Submit
              </StyledButton>
              <StyledIntro>{successMessage}</StyledIntro>
            </>
          ) : (
            <StyledQRCode value={`https://tzkt.io/${userAddress}`} />
          )}
        </StackHeader>
      </StyledPageWrapper>
    </div>
  );
}

export default App;

import React from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { Header, HeaderProps } from "./components/Header";
import Scanner from "./components/Scanner";
import { Footer, FooterProps } from "./components/Footer";

const MainContainer = styled(Container)`
  border-box: box-sizing;
  height: 100vh;
  width: 100%;
  max-width: 768px;
  display: flex;
  flex-direction: column;
`;

const HeaderData: HeaderProps = {
  title: "VERIFICATION STATION",
  subtitle:
    "Scan your Kukai wallet QR code, get a VERI token to verify you were here.",
};

const FooterData: FooterProps = {
  links: [
    {
      title: "TZ Connect",
      url: "https://tzconnect.com/",
    },
    {
      title: "Imprint",
      url: "https://tzconnect.com/en/imprint/",
    },
    {
      title: "Privacy Policy",
      url: "https://tzconnect.com/en/privacy-policy/",
    },
  ],
};

const App = () => {

  return (
    <MainContainer>
      <Header {...HeaderData} />
      <Scanner />
      <Footer {...FooterData} />
    </MainContainer>
  );
};

export default App;

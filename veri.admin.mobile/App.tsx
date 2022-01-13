import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Scanner from "./components/Scanner";
import axios from "axios";
import MemoLogoIcon from "./icons/logo";

export default function App() {
  const [messageType, setMessageType] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [scanned, setScanned] = React.useState(false);

  const handleScan = (data: string) => {
    const scanData = data.substring(data.lastIndexOf("/") + 1);
    if (scanData) {
      try {
        axios
          .get(`https://veri.tzconnect.berlin/dyn/add.cgi?key=${scanData}`)
          .then((res) => {
            setMessage("QR code has been successfully scanned!");
            setMessageType("succeed");
          })
          .catch((err) => {
            setMessage("Something went wrong");
            setMessageType("error");
          })
      } catch (error) {
        setMessage("Something went wrong");
        console.log(error);
      }
    } else {
      setMessage("The code is wrong");
    }
    setScanned(true);
  };

  const handleReScanning = () => {
    setScanned(false);
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <MemoLogoIcon />
      </View>
      {!!message && (
        <Text
          style={{
            ...styles.messageContainer,
            color: messageType === "error" ? "#FF3939" : "#2FBC6C",
          }}
        >
          {message}
        </Text>
      )}
      <Scanner
        onScanning={handleScan}
        hasScanned={scanned}
        onReScanning={handleReScanning}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 180,
    maxWidth: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    fontSize: 20,
    marginVertical: 15,
  },
});

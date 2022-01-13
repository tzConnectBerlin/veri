import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

interface ScannerProps {
  hasScanned: boolean;
  style?: StyleSheet;
  onScanning: (data: string) => void;
  onReScanning: () => void;
}

const Scanner: React.FC<ScannerProps> = ({
  style,
  hasScanned = false,
  onScanning,
  onReScanning,
}) => {
  const [hasPermission, setHasPermission] = useState(false);

  const [x, setX] = useState(-10);
  const [y, setY] = useState(-10);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (res: BarCodeScannerResult) => {
    setContentSize(res);
    onScanning(res.data);
  };

  const setContentSize = (res: BarCodeScannerResult) => {
    setX(res.bounds?.origin.x ?? 0);
    setY(res.bounds?.origin.y ?? 0);
    setWidth(res.bounds?.size.width ?? 0);
    setHeight(res.bounds?.size.height ?? 0);
  };

  const resetScan = () => {
    setX(-10);
    setY(-10);
    setWidth(0);
    setHeight(0);
    onReScanning();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ ...styles.container, ...style }}>
      {hasScanned ? (
        <View style={styles.buttonContainer}>
          <Text onPress={resetScan} style={styles.button}>
            Tap to Scan Again
          </Text>
        </View>
      ) : (
        <View style={styles.scannerContainer}>
          <Text style={styles.title}>QR Code Scanner</Text>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={hasScanned ? setContentSize : handleBarCodeScanned}
            style={styles.scanner}
          >
            <View
              style={{
                ...styles.qrBox,
                width: width,
                height: height,
                top: y,
                left: x,
              }}
            />
          </BarCodeScanner>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginVertical: 15,
    fontSize: 20,
  },
  scannerContainer: {
    height: "70%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scanner: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    margin: 0,
  },
  qrBox: {
    position: "absolute",
    borderColor: "red",
    borderWidth: 2,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    fontSize: 20,
  },
});

export default Scanner;

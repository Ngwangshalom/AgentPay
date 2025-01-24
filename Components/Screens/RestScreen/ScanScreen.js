import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  ScrollView, // Import ScrollView
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { colors } from "../../utils/colors";

const BarcodeScanner = ({ onBarCodeScanned }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanLinePosition, setScanLinePosition] = useState(
    new Animated.Value(0)
  );
  const [scanned, setScanned] = useState(false); // State to manage scan status
  const [scannedData, setScannedData] = useState(""); // State to store scanned data
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    const initialize = async () => {
      await requestCameraPermission();
      animateScanLine();
    };
    initialize();
    requestCameraPermission();
    animateScanLine();
  }, []);

  // Request camera permission
  const requestCameraPermission = async () => {
    const { status } = await requestPermission();
    setHasPermission(status === "granted");
  };

  const animateScanLine = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePosition, {
          toValue: 400,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) return;
    setScanned(true);
    setScannedData(data); // Store the scanned QR code content
    if (typeof onBarCodeScanned === "function") {
      onBarCodeScanned({ type, data });
    }
  };

  const windowWidth = Dimensions.get("window").width;
  const circleSize = windowWidth * 0.8;

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestCameraPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>QR Code Scanner</Text>
        <Text style={styles.instructions}>
          Scan a QR code to view the content. Tap "Tap to Scan Again" after scanning.
        </Text>

        <View
          style={[
            styles.cameraContainer,
            { width: circleSize, height: circleSize },
          ]}
        >
          <CameraView
            style={styles.camera}
            onBarCodeScanned={handleBarCodeScanned}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          />

          <View style={styles.scanLineContainer}>
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [{ translateY: scanLinePosition }],
                },
              ]}
            />
          </View>
        </View>

        {scanned && (
          <View style={styles.scanResultContainer}>
            <Text style={styles.resultText}>Scanned Content:</Text>
            <Text style={styles.resultData}>{scannedData}</Text>
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={styles.permissionButton}
            >
              <Text style={styles.buttonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures the content is scrollable
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 20,
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  cameraContainer: {
    borderRadius: 1000,
    overflow: "hidden",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
  },
  scanLineContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  scanResultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  resultData: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default BarcodeScanner;

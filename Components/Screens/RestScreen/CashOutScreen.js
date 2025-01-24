import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView 
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this package installed
import { colors } from "../../utils/colors";
import { getUserData } from "../../utils/storage";

const CashOutScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");  // Input for email or phone number
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("XAF");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCashOut = async () => {
    if (!emailOrPhone || !amount) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter an email/phone number and amount.",
      });
      return;
    }

    // Validate email format if it's an email address
    if (validateEmail(emailOrPhone) === false && !/^\d+$/.test(emailOrPhone)) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a valid email or phone number.",
      });
      return;
    }

    // Validate minimum amount based on currency
    const amountValue = parseFloat(amount);
    if ((currency === "XAF" || currency === "NGN") && amountValue < 500) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Minimum amount for XAF and NGN is 500.",
      });
      return;
    } else if (currency === "USD" && amountValue < 1) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Minimum amount for USD is 1.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const usersData = await getUserData();
      const payload = {
        emailOrPhone,
        amount: amountValue,
        currency
      };

      // Example API endpoint for cash-out
      const response = await axios.post(
        'https://your-api-endpoint/cash-out',  // Changed to cash-out endpoint
        payload, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usersData.token}`,
          },
        }
      );

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Cash-Out Successful",
          text2: `You have successfully cashed out ${amount} ${currency}.`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Cash-Out Failed",
          text2: "Something went wrong, please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to cash out. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Cash Out</Text>

      {/* Email or Phone Number */}
      <Text style={styles.label}>Email or Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter your email or phone number`}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="default"
        placeholderTextColor="#818181"
      />

      {/* Amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder={`Enter amount to cash out`}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor="#818181"
      />

      {/* Currency Picker */}
      <Text style={styles.label}>Currency</Text>
      <Picker
        selectedValue={currency}
        style={styles.picker}
        onValueChange={(itemValue) => setCurrency(itemValue)}
      >
        <Picker.Item label="XAF" value="XAF" />
        <Picker.Item label="NGN" value="NGN" />
        <Picker.Item label="USD" value="USD" />
      </Picker>

      {/* Cash Out Button */}
      <TouchableOpacity style={styles.cashInButton} onPress={handleCashOut} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.cashInButtonText}>Cash Out</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1A1A1A",
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 18,
    height: 50,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: "white",
    backgroundColor: "#333",
    borderRadius: 8,
    marginBottom: 10,
  },
  cashInButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 50,
  },
  cashInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CashOutScreen;
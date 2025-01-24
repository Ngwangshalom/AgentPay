import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  ScrollView ,
  Image
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from '@expo/vector-icons'; 
import { colors } from "../../utils/colors";
import { getUserData } from "../../utils/storage";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { APP_URL } from "@env";
import styles from './styles';
import SuccessModal from "./SuccessModal";
import Modal from 'react-native-modal';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons'; // For icon usage
import { NavigationService } from "../../../NavigationService";

const CashInScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");  
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [receivingUserData, setReceivingUserData] = useState(null);  // state to store receiving user data
  const [isOpen, setIsOpen] = useState(false); // state to control bottom sheet visibility
  const sheetRef = useRef(null);
  const snapPoints = ["76%"];
  const [isOpens, setIsOpens] = useState(false); // state to control bottom sheet visibility
  const sheetRefs = useRef(null);
  const snapPoint = ["80%"];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };


  const handleNavigate = () => {
  
    // Navigate to another screen or take the required action
    setIsModalVisible(false); // Close the modal
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  const getReceivingUser = async (userId) => {
    try {
      const usersData = await getUserData();
      setIsLoading(true);
      if (!usersData || !usersData.response || !usersData.response.records || !usersData.response.records.token) {
        console.error('Token is missing');
        Toast.show({
          type: "error",
          text1: "Authorization Error",
          text2: "Unable to retrieve authorization token.",
        });
        return;
      }

      const response = await axios.post(
        `${APP_URL}/get-user`, 
        {
          user: emailOrPhone,  
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usersData.response.records.token}`,
          },
        }
      );


      if (response.data.response.status.code === 200) {
        setIsLoading(false);
        // setIsOpens(true);
        setReceivingUserData(response.data.response.records); // Set the receiving user data
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.response.status.message,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching receiving user data:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch receiving user data.",
      });
      setIsLoading(false);
    }
  };

  const handleCashIn = async () => {
    setIsOpens(false);
    if (!emailOrPhone || !amount) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter an email/phone number and amount.",
      });
      return;
    }

    if (validateEmail(emailOrPhone) === false && !/^\d+$/.test(emailOrPhone)) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter a valid email or phone number.",
      });
      return;
    }

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

      if (!usersData || !usersData.response || !usersData.response.records || !usersData.response.records.token) {
        console.error('Token is missing');
        Toast.show({
          type: "error",
          text1: "Authorization Error",
          text2: "Unable to retrieve authorization token.",
        });
        return;
      }

      const payload = {
        amount: amountValue,
        currency_id: currency,
      };

      const response = await axios.post(
        `${APP_URL}/deposit-amount-limit`, 
        payload, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usersData.response.records.token}`,
          },
        }
      );

      if (response.data.response.status.code === 200) {
        const records = response.data.response.records;

        const updatedUserData = {
          amount: records.formattedAmount,
          currency: records.currencyCode,
          totalAmount: records.formattedTotalAmount,
          totalFees: records.formattedTotalFees,
          agentFees: records.formattedAgentFees,
          // minLimit: records.min,
          // maxLimit: records.max,
        };

        setUserData(updatedUserData);

        Toast.show({
          type: "success",
          text1: "Cash-In Successful",
          text2: response.data.response.status.message,
        });
        
        setIsOpen(true); // Open bottom sheet after cash-in success
        await getReceivingUser();


      } else {
        Toast.show({
          type: "error",
          text1: "Balance Failed",
          text2: response.data.response.status.code,
        });
      }
    } catch (error) {
      console.error('Error during cash-in:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Check Your Details and Try Again.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const FinalizeCashIn = async () => {
    try {
      const usersData = await getUserData();
      setIsLoading(true);
      if (!usersData || !usersData.response || !usersData.response.records || !usersData.response.records.token) {
        console.error('Token is missing');
        Toast.show({
          type: "error",
          text1: "Authorization Error",
          text2: "Unable to retrieve authorization token.",
        });
        return;
      }

      const response = await axios.post(
        `${APP_URL}/deposit-confirm`, 
        {
          user: emailOrPhone,  
          currency_id: currency,
          amount: amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usersData.response.records.token}`,
          },
        }
      );

      if (response.data.response.status.code === 200) {
        setIsLoading(false);
        setReceivingUserData(response.data.response.records); 
        setIsOpen(false);
        // Navigate to SuccessModal with parameters
        NavigationService.navigate('SuccessPage', {
          userData:userData, 
          transactionDetails: receivingUserData,  
        });
      }
       else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.response.status.message,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching receiving user data:', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch receiving user data.",
      });
      setIsLoading(false);
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Cash In</Text>

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
        placeholder={`Enter amount to cash in`}
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
        <Picker.Item label="XAF" value="6" />
        <Picker.Item label="NGN" value="7" />
        <Picker.Item label="USD" value="1" />
      </Picker>

      {/* Cash In Button */}
      <TouchableOpacity style={styles.cashInButton} onPress={handleCashIn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.cashInButtonText}>Cash In</Text>
        )}
      </TouchableOpacity>
    
      <Toast />

      
      {isOpen && (
        <BottomSheet
  ref={sheetRef}
  snapPoints={snapPoints}
  enablePanDownToClose={true}
  enableDismissOnClose={true}
  backgroundStyle={{ borderRadius: 15, backgroundColor: colors.primary }}
  onClose={() => setIsOpen(false)} 
>
          <BottomSheetScrollView>
            <View style={styles.bottomSheetContent}>
              <Text style={styles.accountDetailsTitle}>Account Details</Text>
              {userData ? (
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Field</Text>
                    <Text style={styles.valueText}>Value</Text>
                  </View>
                  {Object.keys(userData).map((key) => (
                    <View key={key} style={styles.tableRow}>
                      <Text style={styles.fieldText}>{key}</Text>
                      <Text style={styles.valueText}>{userData[key]}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.userDataText}>Loading...</Text>
              )}

              {receivingUserData && (
                <View style={styles.tableContainer}>
                  <Text style={styles.accountDetailsTitle}>Receiving User Details</Text>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Name</Text>
                    <Text style={styles.valueText}>{`${receivingUserData.first_name} ${receivingUserData.last_name}`}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Email</Text>
                    <Text style={{color:'white',right:20}}>{receivingUserData.email}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Phone</Text>
                    <Text style={styles.valueText}>{receivingUserData.formattedPhone}</Text>
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.cashInButton} onPress={FinalizeCashIn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.cashInButtonText}>Finalze Payment </Text>
        )}
      </TouchableOpacity>            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
      {isOpens && (
        <BottomSheet
  ref={sheetRef}
  snapPoints={snapPoints}
  enablePanDownToClose={true}
  enableDismissOnClose={true}
  backgroundStyle={{ borderRadius: 15, backgroundColor: colors.primary }}
  onClose={() => setIsOpen(false)} 
>
 

          <BottomSheetScrollView>
            <View style={styles.bottomSheetContent}>
          
              {receivingUserData && (
                <View style={styles.tableContainer}>
                  <Text style={styles.accountDetailsTitle}>Receiving User Details</Text>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Name</Text>
                    <Text style={styles.valueText}>{`${receivingUserData.first_name} ${receivingUserData.last_name}`}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Email</Text>
                    <Text style={styles.valueText}>{receivingUserData.email}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.fieldText}>Phone</Text>
                    <Text style={styles.valueText}>{receivingUserData.formattedPhone}</Text>
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.cashInButton} onPress={handleCashIn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.cashInButtonText}>Continue </Text>
        )}
      </TouchableOpacity>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      )}
    </ScrollView>
  );
};

export default CashInScreen;

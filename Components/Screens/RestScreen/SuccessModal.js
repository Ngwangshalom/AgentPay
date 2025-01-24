import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For icon usage
import { colors } from '../../utils/colors';

const SuccessPage = ({ route, navigation }) => {
  // Extract the parameters passed during navigation
  const { userData, transactionDetails } = route.params;

  console.log(userData, transactionDetails);
  const handleNavigate = () => {
    navigation.navigate('Dashboard'); // Adjust to the name of your dashboard screen
  };

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.iconContainer}>
        <Feather name="check-circle" size={60} color="#4CAF50" />
      </View>

      <Text style={styles.successText}>Cashin Successful!</Text>

      {/* User Information */}
      <View style={styles.userInfoContainer}>
        <Image
          source={{ uri: `https://whapplepay.com/public/uploads/user-profile/${transactionDetails?.picture}` }}
          style={styles.userImage}
        />
        <Text style={styles.userName}>
          {transactionDetails?.first_name} {transactionDetails?.last_name}
        </Text>
        <Text style={styles.amount}>{userData?.amount}</Text>
        <Text style={styles.transactionDetails}>Transaction Type: Cash In</Text>
        <Text style={styles.transactionDetails}>Payment Method: Cash</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: colors.primary,
  },
  iconContainer: {
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 20,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 5,
  },
  amount: {
    fontSize: 18,
    color: '#2196F3',
    marginBottom: 8,
  },
  transactionDetails: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#FF5733',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
});

export default SuccessPage;

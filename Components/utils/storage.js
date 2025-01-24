import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store user data
export const storeUserData = async (userData) => {
  try {
    if (!userData) {
      throw new Error('No user data provided for storage.');
    }
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('@user_data', jsonValue);
    console.log('User data stored successfully.');
  } catch (e) {
    console.error('Error storing user data: ', e.message || e);
  }
};

// Function to retrieve user data
export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@user_data');
    if (jsonValue === null) {
      console.warn('No user data found in AsyncStorage.');
    }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving user data: ', e.message || e);
    return null; // Return null if an error occurs
  }
};

// Function to remove user data (e.g., for logout)
export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem('@user_data');
    console.log('User data removed successfully.');
  } catch (e) {
    console.error('Error removing user data: ', e.message || e);
  }
};

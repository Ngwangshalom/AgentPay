import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './Components/OnboardingScreen';
import LoginScreen from './Components/Screens/Auth/LoginScreen';
import HomeScreen from './Components/Screens/Home/HomeScreen';
import { StatusBar } from 'react-native';
import LandingPage from './Components/Screens/Auth/LandingPage';
import BottomNav from './Components/Screens/Home/BottomNav';
import MainHeader from './Components/extra/Header/Default';
import ForgotPassword from './Components/Screens/Auth/ForgotPassword';
import { navigationRef } from './NavigationService';
import ScanScreen from './Components/Screens/RestScreen/ScanScreen';
import CashInScreen from './Components/Screens/RestScreen/CashInScreen';
import CashOutScreen from './Components/Screens/RestScreen/CashOutScreen';
import CustomDrawerContent from './Components/extra/CustomDrawerContent'; // Import your custom drawer content
import { getUserData } from './Components/utils/storage';
import SuccessModal from './Components/Screens/RestScreen/SuccessModal';
import SuccessPage from './Components/Screens/RestScreen/SuccessModal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        header: () => <MainHeader openDrawer={navigation.toggleDrawer} />, 
      })}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen
        name="CashInScreen"
        component={CashInScreen}
        options={{ headerShown: false }} 
      />
      <Drawer.Screen
        name="CashOutScreen"
        component={CashOutScreen}
        options={{ headerShown: false }} 
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      const userData = await getUserData() 
      if (userData) {
        setInitialRoute('BottomNav');
      } else {
        setInitialRoute('Onboarding');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setInitialRoute('Onboarding'); 
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status on app load
  }, []);

  if (initialRoute === null) {
    // Show a loading screen while determining the initial route
    return null; // Or you can use a loading spinner or splash screen
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#282534" />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeDrawer"
              component={HomeDrawerNavigator} 
              options={{ headerShown: false }} // No header for drawer
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword} 
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BottomNav"
              component={BottomNav}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="SuccessPage"
              component={SuccessPage}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="CashInScreen"
              component={CashInScreen}
              options={{ headerShown: false }}
            />
               <Stack.Screen
              name="CashOutScreen"
              component={CashOutScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import { colors } from '../../utils/colors';

import * as Device from 'expo-device';

import { getUserData } from '../../utils/storage';

import ScanScreen from '../RestScreen/ScanScreen';
import SettingScreen from '../RestScreen/SettingScreen';
import HomeScreen from './HomeScreen';

const BottomNav = () => {
  const Tabs = AnimatedTabBarNavigator();
  const [counts, setCounts] = useState({ cartItemsCount: 0, incompleteOrdersCount: 0 });

  const [expoPushTokens, setExpoPushTokens] = useState([]);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Permission not granted to get push token for push notification!");
        return;
      }
      try {
        const { data: pushToken } = await Notifications.getDevicePushTokenAsync();
        console.log("token",pushToken);
        // await sendExpoPushToken(pushToken);
        return pushToken;
      } catch (e) {
        console.error("Error getting push token: ", e);
      }
    } else {
      Alert.alert("Must use a physical device for push notifications");
    }
  }

  useEffect(() => {
 

    const foregroundSubscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Foreground Notification Received:", notification);

      // Extract data from both 'notification' and 'data'
      const title = notification.request.content.title || JSON.stringify(notification.request.content.data?.title);
      const body = notification.request.content.body || notification.request.content.data?.body;
      const image = notification.request.content.data?.image || notification.request.content.image;

      // Display notification content using Alert and handle navigation
      if (title && body) {
        Alert.alert(
          title,
          body,
          [
            {
              text: "Open",
              onPress: () => {
                handleNotificationNavigation(notification.request.content.data);
              },
            },
            {
              text: "Dismiss",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
      } else {
        console.warn("Notification received without title or body.");
      }

      // Display an image if available
      if (image) {
        console.log("Displaying image:", image);
        // You can use an Image component to display the image, if needed
      }
     
    });

    // Listener for handling user interaction with notifications in the background
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Background Notification Response:", response);
      const data = response.notification.request.content.data;
      handleNotificationNavigation(data);
    });

    // Cleanup subscriptions on unmount
    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);
  useEffect(() => {
    if (Device.osName === "Android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

  }, []);

  const sendExpoPushToken = async (token) => {
    try {
      const userToken = await getUserData(); 
      const headers = {
        Authorization: `Bearer ${userToken.access_token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post('https://njgrills.com/api/expo-push-tokens', { push_token: token }, { headers });
      console.log('Expo push token stored successfully:', response.data);
    } catch (error) {
      console.error('Error storing Expo push token:', error);
    }
  };
 
  useEffect(() => {
    const registerNotifications = async () => {
      await registerForPushNotificationsAsync();
    };
  
    registerNotifications();
  
    // Return a cleanup function if needed, or `undefined` (default if nothing is returned)
    return () => {
      // Cleanup logic if necessary (e.g., unsubscribing from listeners)
    };
  }, []);
  
  
  
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userToken = await getUserData(); 
//         const headers = {
//           Authorization: `Bearer ${userToken.access_token}`,
//           'Content-Type': 'application/json',
//         };
//         const response = await axios.get('https://njgrills.com/api/dashboard/counts', { headers });
//         setCounts(response.data);
//       } catch (error) {
//         console.error('Error fetching counts:', error);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 10000); // Fetch counts every 2 minutes

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

  return (
    <Tabs.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.background,
        inactiveTintColor: colors.primary,
      }}
      appearance={{
        floating: true,
        topPadding: 10,
        horizontalPadding: 30,
        tabBarBackground:colors.border,
        shadow: true,
        activeTabBackgrounds: [colors.primary, colors.primary, colors.primary, '#EB4D4B'],
        activecolors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
        whenActiveShow:'both',
        whenInactiveShow: 'icon-only',
        tabButtonLayout: 'horizontal',
        dotCornerRadius: 50,
        dotSize: 'medium',
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />

      {/* Example: Orders Screen */}
      <Tabs.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ position: 'relative' }}>
              <Ionicons name={focused ? 'qr-code' : 'qr-code-outline'} size={size} color={color} />
              {counts.incompleteOrdersCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{counts.incompleteOrdersCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      {/* Example: My Cart Screen */}
      <Tabs.Screen
        name="Setup"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{ position: 'relative' }}>
              <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
              {counts.cartItemsCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{counts.cartItemsCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />

    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -13,
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BottomNav;

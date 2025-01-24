import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Button from '../../utils/Button';

export default function AgentForm() {
      const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://assets.withfra.me/Landing.3.png' }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Become a{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>Whapple Pay Agent</Text>
            </View>
          </Text>
          <Text style={styles.text}>
            Join us and start earning by helping others with their financial
            needs.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
        <Button text="Apply"  isOutline={true} />
<View style={{width: 15}} />
        <Button text="Login" onPress={() => navigation.replace('Login')}  isOutline={false} />
       
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#ffffff', // White text
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#b0b0b0', // Light gray text
    textAlign: 'center',
  },
  hero: {
    backgroundColor: '#1f1f1f', // Darker background for hero
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 400,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#2a2a2a', 
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row', // Stack buttons vertically
    justifyContent: 'space-between', // Space buttons evenly
    marginTop: 20, // Optional: add space on top
    paddingHorizontal: 15, // Optional: horizontal padding
  },
  button: {
    flex: 1,
    backgroundColor: '#3a3a3a',
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff', 
  },
});

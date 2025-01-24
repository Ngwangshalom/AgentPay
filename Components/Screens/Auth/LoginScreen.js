import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; 
import Toast from 'react-native-toast-message';
import { colors } from '../../utils/colors'; 
import Button from '../../utils/Button';
import {APP_URL} from '@env'
import getHeaders from '../../utils/headers';
import { storeUserData } from '../../utils/storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    console.log(form, APP_URL);
  
    try {
      const response = await axios.post(
        `${APP_URL}/login`,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: getHeaders(),
        }
      );
  
      console.log('Response Data:', response.data);
  
      if (response.data.response.status.code === 200) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
          text2: 'Welcome back!',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
  
        // Store the user data
        await storeUserData(response.data);
  
        // Navigate to the main app screen
        navigation.replace('BottomNav');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed!',
          text2: 'Invalid credentials. Please try again.',
          position: 'top',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'An error occurred!',
        text2: 'Please try again later.',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('../../../assets/image2.png')} />
          <Text style={styles.title}>
            Sign in to <Text style={{ color: colors.white }}>Agent Pay</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor={colors.secondary}
              style={styles.inputControl}
              value={form.email} />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor={colors.secondary}
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          <View style={styles.formAction}>
            
            <Button
  text="Submit"
  onPress={handleLogin}
  isOutline={false}  
  loading={loading} 
/>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ForgotPassword')
            }}>
            <Text style={styles.formLink}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity
        onPress={() => {
          // handle link to sign up page
        }}>
        <Text style={styles.formFooter}>
          Apply for Agent account{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
        </Text>
      </TouchableOpacity>

      {/* Add Toast component to render the toasts */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: colors.gray,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 110,
    height: 150,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.white,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: colors.white,
  },
  btnDisabled: {
    backgroundColor: '#B0BEC5',
    borderColor: '#B0BEC5',
  },
});

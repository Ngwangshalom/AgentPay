import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import Button from '../../utils/Button';
import CustomSwitch from '../../utils/CustomSwitch';
import {APP_VERSION} from '@env'
import { removeUserData } from '../../utils/storage';
import { NavigationService } from '../../../NavigationService';
import { useNavigation } from '@react-navigation/native';
export default function SettingScreen() {
   const navigation = useNavigation();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
const handleLogout = async () => {
  console.log("data");
  await removeUserData();
  navigation.replace('Login');

}
  const handleMenuOption = (option) => {
    setMenuVisible(false); // Hide menu after selection
    console.log(`Selected option: ${option}`);
    // Add logic for handling the selected option here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.headerTitle}>
          Settings
        </Text>

        <View style={styles.headerAction}>
          <TouchableOpacity onPress={toggleMenu}>
            <Feather color="#fff" name="more-vertical" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOption('Profile')}>
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOption('Settings')}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuOption('Logout')}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Account Section */}
        <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionBody}>
            <TouchableOpacity style={styles.profile}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-photo/handsome-afro-american-man-casual-clothes-holding-cup-coffee-using-laptop_231208-5481.jpg',
                }}
                style={styles.profileAvatar}
              />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>Agent Ngwang</Text>
                <Text style={styles.profileHandle}>Ngwang@gmail.com</Text>
              </View>
              <Feather color="#fff" name="chevron-right" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>English</Text>
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity style={styles.row}>
                <Text style={styles.rowLabel}>Location</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>Bamenda, CM</Text>
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>
                <View style={styles.rowSpacer} />
                <CustomSwitch
                  value={form.emailNotifications}
                  onValueChange={(emailNotifications) =>
                    setForm({ ...form, emailNotifications })
                  }
                  activeText="ENABLED"
                  inactiveText="DISABLED"
                />
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>
                <View style={styles.rowSpacer} />
                <CustomSwitch
                  value={form.pushNotifications}
                  onValueChange={(pushNotifications) =>
                    setForm({ ...form, pushNotifications })
                  }
                  activeText="ENABLED"
                  inactiveText="DISABLED"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Report Bug</Text>
                <View style={styles.rowSpacer} />
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Rate in App Store</Text>
                <View style={styles.rowSpacer} />
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>

            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Terms and Privacy</Text>
                <View style={styles.rowSpacer} />
                <Feather color="#fff" name="chevron-right" size={19} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Button text="Log Out" onPress={handleLogout}
  isOutline={false} />

        <Text style={styles.contentFooter}>App Version {APP_VERSION}</Text>
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2c2c2c',
  },
  headerAction: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 8,
    zIndex: 10,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 13,
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  profileHandle: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLabel: {
    color: '#fff',
    fontSize: 16,
  },
  rowSpacer: {
    flex: 1,
  },
  rowValue: {
    color: '#ababab',
    fontSize: 16,
  },
});

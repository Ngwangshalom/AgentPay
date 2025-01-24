import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from './colors';

const CustomSwitch = ({ value, onValueChange, activeText, inactiveText }) => {
  return (
    <TouchableOpacity
      style={[
        styles.switchContainer,
        value ? styles.switchContainerActive : styles.switchContainerInactive,
      ]}
      onPress={() => onValueChange(!value)}
    >
      <View
        style={[
          styles.switchThumb,
          value ? styles.switchThumbActive : styles.switchThumbInactive,
        ]}
      />
      <Text style={styles.switchText}>
        {value ? activeText || 'ON' : inactiveText || 'OFF'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 60,
    height: 30,
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    position: 'relative',
  },
  switchContainerActive: {
    backgroundColor: colors.primary,
  },
  switchContainerInactive: {
    backgroundColor: '#e0e0e0',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 5,
  },
  switchThumbActive: {
    left: 35,
  },
  switchThumbInactive: {
    left: 5,
  },
  switchText: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -8 }],
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    left: 10,
  },
});

export default CustomSwitch;

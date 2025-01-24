import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { colors } from '../utils/colors';


const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <DrawerItemList {...props} />
        <TouchableOpacity onPress={() => props.navigation.navigate('CashInScreen')}>
          <Text style={styles.item}>Cash In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('CashOutScreen')}>
          <Text style={styles.item}>Cash Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background, // Adjust as necessary
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.white,
  },
  item: {
    fontSize: 18,
    marginVertical: 10,
    color: colors.white,
  },
});

export default CustomDrawerContent;
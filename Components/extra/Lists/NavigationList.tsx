import React from "react";
import { View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../utils/colors";


const options = ["Home", "Profile", "Accounts", "Stats", "Settings", "Help"];

const NavigationOptions = () => {
  return (
    <FlatList
      data={options}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 20,
            borderLeftColor: colors.yellow,
            borderLeftWidth: index === 0 ? 5 : 0,
          }}
        >
          <Text
            style={{
              color: colors.blackText,
              fontWeight: index === 0 ? "bold" : "normal",
            }}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index: number): string => `${index}`}
    />
  );
};

export default NavigationOptions;

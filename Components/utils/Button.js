import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { colors } from "./colors"; // Make sure COLORS are correctly defined or imported
import styles from "./styles"; // Import the styles file

const Button = ({ text, onPress, isOutline = false, style = {}, loading = false }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.btn,
        isOutline && {
          borderColor: colors.white,
          borderWidth: 1,
          backgroundColor: "transparent",
        },
        style, // Additional custom styles
      ]}
      disabled={loading} // Disable the button when loading
    >
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator size="small" color={isOutline ? colors.white : colors.black} />
        ) : (
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 15,
                color: isOutline ? colors.white : colors.black,
              },
            ]}
          >
            {text}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

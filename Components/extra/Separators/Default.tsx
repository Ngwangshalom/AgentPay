import React from "react";
import { View, Text } from "react-native";
import { colors } from "../../utils/colors";

interface Props {
  label: string;
}

const Default: React.FC<Props> = ({ label }) => {
  return (
    <View style={{ paddingHorizontal: 13, marginBottom: 10 }}>
      <Text style={{ color: colors.secondary, fontWeight: "bold" }}>
        {label}
      </Text>
    </View>
  );
};

export default Default;

import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../../utils/colors";

interface Props {
  label: string;
  onPress: () => void;
}

const Transparent: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        alignItems: "center",
        flex: 1,
      }}
      onPress={() => (onPress ? onPress() : {})}
    >
      <Text style={{ color: colors.blackText }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Transparent;

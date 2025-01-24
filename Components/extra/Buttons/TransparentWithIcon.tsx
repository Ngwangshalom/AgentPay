import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface Props {
  label: string;
  icon: string;
  onPress: () => void;
}

const Transparent: React.FC<Props> = ({ label, onPress, icon }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      }}
      onPress={() => (onPress ? onPress() : {})}
    >
      <Ionicons name={icon} color={colors.blackText} size={16} />
      <Text
        style={{ color: colors.blackText, fontWeight: "bold", marginLeft: 10 }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Transparent;

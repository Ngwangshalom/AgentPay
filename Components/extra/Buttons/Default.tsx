import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface Props {
  label: string;
  icon: string;
  onPress: () => void;
}

const Default: React.FC<Props> = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => (onPress ? onPress() : {})}
    >
      <Text style={style.text}>{label}</Text>
      <FontAwesome name={icon} color={colors.blackText} />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  text: {
    color: colors.blackText,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default Default;

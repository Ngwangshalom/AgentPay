import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../utils/colors";

interface Props {
  onPress: () => void;
}

const AddNew: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'orange',
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
      }}
    >
      <Feather name="plus" color={colors.blackText} size={20} />
    </TouchableOpacity>
  );
};

export default AddNew;

import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { colors } from "../../utils/colors";
import { Services } from "../../Screens/helpers/interfaces";
import { NavigationService } from "../../../NavigationService";

interface Props {
  list: Array<Services>;
}

const handleNavigation = (route) => {
  const validRoutes = [
    'CashInScreen',
    'CashOutScreen',
    // Add any other valid routes here
  ];

  if (validRoutes.includes(route)) {
    NavigationService.navigate(route);
  } else {
    Alert.alert("Screen Coming Soon", "This screen is currently under development. Please check back later.");
  }
};

const ServicesList: React.FC<Props> = ({ list }) => {
  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      data={list}
      renderItem={({ item, index }) => (
        <TouchableOpacity
        onPress={() => handleNavigation(item.route)}
          style={{
            width: 70,
            alignItems: "center",
            marginHorizontal: 10,
            marginBottom: 20,
          }}
          
        >
          <View
            style={{
              backgroundColor: colors.white,
              width: 70,
              height: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 16,
              marginBottom: 10,
            }}
          >
            <FontAwesome5 name={item.icon} size={30} color={colors.darkBlue} />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize:12,
              color: colors.secondary,
              textTransform: "capitalize",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      numColumns={4}
    />
  );
};

export default ServicesList;

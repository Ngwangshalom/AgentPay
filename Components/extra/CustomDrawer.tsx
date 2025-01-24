import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";

import Avatar from "./Avatars/Menu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationList from "./Lists/NavigationList";
import Logout from "./Buttons/TransparentWithIcon";
import Constants from "expo-constants";

import { colors } from "../utils/colors";
import helpers from "../Screens/helpers";

const { height } = Dimensions.get("window");

const CustomDrawer = () => {
  const navigation = useNavigation();
  const user = helpers.genActiveUser();

  return (
    <DrawerContentScrollView
      style={{
        backgroundColor: colors.offWhite,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={style.headerContainer}>
          <View style={style.userBox}>
            <Avatar uri={user.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={style.userText}>{user.fullName}</Text>
              <Text style={style.locationText} numberOfLines={1}>
                {user.location}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            style={{ marginRight: 20 }}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={20}
              color={colors.darkBlue}
            />
          </TouchableOpacity>
        </View>

        <NavigationList />
      </SafeAreaView>

      <View style={style.bottomContent}>
        <Logout onPress={() => {}} icon="md-log-out" label="Logout" />
        <Text
          style={{ color: colors.darkBlue, fontSize: 9, marginTop: 40 }}
        >{`Version 1.0.0`}</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const style = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 50,
  },
  userBox: {
    backgroundColor: colors.white,
    paddingVertical: 30,
    flexDirection: "row",
    borderBottomRightRadius: 60,
    alignItems: "center",
    width: 250,
  },
  userText: {
    fontWeight: "700",
    color: colors.blackText,
  },
  locationText: {
    fontSize: 10,
    marginTop: 4,
    color: colors.darkBlue,
  },
  bottomContent: {
    position: "absolute",
    top: height - 160,
    paddingHorizontal: 20,
  },
});

export default CustomDrawer;

import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { getUserData } from "../../utils/storage"; // Import getUserData function
import getHeaderContainerStyle from "./getHeaderContainerStyle";
import { colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const MainHeader = ({ nomargin = false }) => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData(); // Get user data from AsyncStorage
      console.log(data);
      if (data) {
        setUserData(data); // Set user data to state
      }
    };

    fetchUserData(); 
  }, []);

  const openDrawer = () => {
    console.log("Opening drawer");
    // navigation.toggleDrawer(); 
  };

  return (
    <View
      style={[
        {
          height: 45,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 13,
        },
        getHeaderContainerStyle(nomargin),
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../../assets/logo.png")}
          resizeMode="contain"
          style={{ width: 40 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10,
            color: colors.white,
          }}
        >
          Agent Pay
        </Text>
      </View>
      <TouchableOpacity>
        {userData && userData.response.records && userData.response.records.agent ? (
          <Image
            source={{ uri: userData.response.records.agent.photo }}
            style={{ width: 50, height: 50 }}
          />
        ) : (
          <Image
            source={require("../../../assets/src/Me.png")} 
            style={{ width: 50, height: 50 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

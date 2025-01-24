import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AddNew from "../Buttons/AddNew";
import Avatar from "../Avatars/Menu";
import { colors } from "../../utils/colors";
import { User } from "../../Screens/helpers/interfaces";

interface Props {
  list: Array<User>;
}

const FriendsList: React.FC<Props> = ({ list }) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          paddingLeft: 13,
          marginBottom: 40,
        }}
        data={list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <>
            {index === 0 ? (
              <AddNew key={item.fullName} onPress={() => {}} />
            ) : (
              <TouchableOpacity
                key={item.id}
                style={{
                  backgroundColor: 'transparent',
                  marginHorizontal: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                  borderRadius: 8,
                }}
              >
                <Avatar uri={item.avatar} />
                <Text style={{ marginTop: 10, color: colors.white }}>
                  {item.fullName}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FriendsList;

import * as React from "react";
import { View, Text, Button, TextInput, Image } from "react-native";

import { Navigation } from "../interfaces/screen.interface";

export const Login: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  return (
    <View>
      <Image source={require("../assets/smile.png")} />
      <Text>Friday's shop</Text>
      <TextInput />
      <TextInput />
      <Button
        title="login"
        onPress={() => {
          navigation.navigate("ProductList");
        }}
      />
    </View>
  );
};

import * as React from "react";
import { View, Text, Button, TextInput, Image, StyleSheet } from "react-native";

import { Navigation } from "../interfaces/screen.interface";

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontSize: 30
  },
  input: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    width: 300
  }
});

export const Login: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../assets/smile.png")} />
      <Text style={styles.title}>Friday's shop</Text>
      <TextInput placeholder="email" style={styles.input} />
      <TextInput placeholder="Text box" style={styles.input} />
      <Button
        title="login"
        onPress={() => {
          navigation.navigate("ProductList");
        }}
      />
    </View>
  );
};

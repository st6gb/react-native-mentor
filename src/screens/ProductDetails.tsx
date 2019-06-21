import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "../interfaces/screen.interface";

const styles = StyleSheet.create({
  wrapper: {
    borderColor: "black",
    borderWidth: 0.5,
    flex: 1,
    justifyContent: "flex-start"
  },
  header: {}
});

export const ProductDetails: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Icon name={product.icon} size={40} />
        <Text>{product.name}</Text>
      </View>
      <View>
        <Text>{product.description}</Text>
        <Button
          title="goBack"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

ProductDetails.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("product").name,
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

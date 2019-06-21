import * as React from "react";
import { View, Text, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "../interfaces/screen.interface";

export const ProductDetails: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  return (
    <View>
      <Icon name={product.icon} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Button
        title="goBack"
        onPress={() => {
          navigation.goBack();
        }}
      />
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

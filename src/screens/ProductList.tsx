import * as React from "react";
import { View, Text, Button } from "react-native";
import { Navigation } from "../interfaces/screen.interface";
import { NavigationScreenProps } from "react-navigation";
import { Icon } from "react-native-elements";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

const mockData = [
  {
    id: 1,
    name: "Product1",
    icon: "face",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  },
  {
    id: 2,
    name: "Product2",
    icon: "motorcycle",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  },
  {
    id: 3,
    name: "Product3",
    icon: "style",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  },
  {
    id: 4,
    name: "Product4",
    icon: "tram",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
  }
];

export const ProductList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  return (
    <View>
      {mockData.map(product => {
        return (
          <View key={product.id}>
            <Icon name={product.icon} />
            <Text>{product.name}</Text>
            <Icon
              raised
              name="ac-unit"
              color="#f50"
              onPress={() => {
                navigation.navigate("ProductDetails", { product });
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

ProductList.navigationOptions = () => {
  return {
    title: "Products",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

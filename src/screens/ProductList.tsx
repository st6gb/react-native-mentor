import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Navigation } from "../interfaces/screen.interface";
import { NavigationScreenProps } from "react-navigation";
import { Icon } from "react-native-elements";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5
  },
  name: {
    fontSize: 20,
    marginVertical: 15,
    flexGrow: 2
  },
  icon: {
    marginVertical: 15,
    marginHorizontal: 15
  },
  products: {
    flex: 1,
    justifyContent: "flex-start"
  }
});

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
    <ScrollView>
      <View style={styles.products}>
        {mockData.map(product => {
          return (
            <View key={product.id} style={styles.container}>
              <Icon name={product.icon} size={35} iconStyle={styles.icon} />
              <Text style={styles.name}>{product.name}</Text>
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
    </ScrollView>
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

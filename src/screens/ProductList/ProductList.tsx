import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Navigation } from "../../interfaces/screen.interface";
import { NavigationScreenProps } from "react-navigation";
import { Icon } from "react-native-elements";

import { styles } from "./ProductList.styles";
import { mockData } from "./data.mock";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

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

// @ts-ignore
ProductList.navigationOptions = ({ navigation }) => {
  return {
    title: "Products",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerLeft: (
      <Icon
        raised
        name="book"
        color="#f50"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationScreenProps } from "react-navigation";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";
import { Navigation } from "../../interfaces/screen.interface";
import { Icon } from "react-native-elements";
import { getProductsInShop, addProductInList } from "../../services/httpClient";
import { Product } from "../../interfaces/screen.interface";

import { styles } from "./styles";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const ProductList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    if (products.length === 0) {
      getProductsInShop()
        .then(res => {
          setProducts(res);
          setLoading(false);
        })
        .catch(err => {
          throw err;
        });
    }
  }, []);
  return (
    <ScrollView>
      <View style={styles.products}>
        <Button
          title="storage"
          onPress={async () => {
            try {
              const token = await AsyncStorage.getItem("@token");
            } catch (error) {
              console.log(error);
            }
          }}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {!loading &&
          products.map((product: Product) => {
            if (product) {
              return (
                <TouchableOpacity
                  key={product._id}
                  style={styles.container}
                  onPress={() => {
                    navigation.navigate("ProductDetails", { product });
                  }}
                >
                  <Icon name={product.icon} size={35} iconStyle={styles.icon} />
                  <Text style={styles.name}>{product.name}</Text>
                  <Icon
                    raised
                    name="ac-unit"
                    color="#f50"
                    onPress={() => {
                      addProductInList(product).then(res => console.log(res));
                    }}
                  />
                </TouchableOpacity>
              );
            }
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
    headerRight: (
      <Icon
        raised
        name="book"
        color="#f50"
        onPress={() => {
          navigation.navigate("GoodsList");
        }}
      />
    ),
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

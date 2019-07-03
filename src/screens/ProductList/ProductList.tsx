import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationScreenProps } from "react-navigation";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Navigation } from "../../interfaces/screen.interface";
import { Icon } from "react-native-elements";
import { getProductsInShop, addProductInList } from "../../services/httpClient";
import { Product } from "../../interfaces/screen.interface";
import { notification } from "../../utils/notification";

import { styles } from "./styles";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const ProductList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(2);

  React.useEffect(() => {
    if (products.length === 0) {
      getProductsInShop(1)
        .then(res => {
          setProducts(res.docs);
          setLoading(false);
        })
        .catch(err => {
          throw err;
        });
    }
  }, []);
  return (
    <View style={styles.products}>
      <FlatList
        data={products}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        keyExtractor={(item, index) => item._id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setLoading(true);
          getProductsInShop(page)
            .then(res => {
              setProducts([...products, ...res.docs]);
              setPage(page + 1);
              setLoading(false);
            })
            .catch(err => {
              throw err;
            });
        }}
        renderItem={({ item: product }) => {
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
                name="add-shopping-cart"
                color="#f50"
                onPress={() => {
                  addProductInList(product).then(response => {
                    if (!response.ok) {
                      return notification("ошибка", "error");
                    }
                    if (response.nModified) {
                      return notification("Добавлено", "ok");
                    }
                    return notification("Уже добавлено", "attention");
                  });
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
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
        name="people-outline"
        type="material"
        color="#f50"
        onPress={() => {
          navigation.navigate("Login");
          AsyncStorage.removeItem("@token");
        }}
      />
    ),
    headerRight: (
      <Icon
        raised
        name="kitchen"
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

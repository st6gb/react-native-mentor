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
import { addProductInList } from "../../services/httpClient";
import { useHttpClient } from "../../services/useHttpClient";
import { Product } from "../../interfaces/screen.interface";
import { notification } from "../../utils/notification";
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from "./styles";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const ProductList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const {
    getProductsInShop,
    state: {
      products: { data, loading, page }
    }
  } = useHttpClient();
  const { isConnected } = useNetInfo();
  React.useEffect(() => {
    if (page === 1) {
      getProductsInShop(page);
    }
  }, []);
  return (
    <View style={styles.products}>
      <FlatList
        data={data}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        keyExtractor={(item: Product, index) => item._id}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          getProductsInShop(page).catch(err => {
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

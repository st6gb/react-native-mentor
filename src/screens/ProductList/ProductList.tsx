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
    getUsersProducts,
    deleteProducts,
    voteForProduct,
    state: {
      products: { data, loading, page },
      userProducts: { data: userData, fetchUserProducts }
    }
  } = useHttpClient();
  const [userEmail, setUserEmail] = React.useState<string | null>("");
  AsyncStorage.getItem("@name").then(res => setUserEmail(res));
  const { isConnected } = useNetInfo();
  React.useEffect(() => {
    getUsersProducts();
    if (page === 1) {
      getProductsInShop(page);
    }
  }, []);
  return (
    <View style={styles.products}>
      <FlatList
        data={data}
        ListFooterComponent={() =>
          loading || fetchUserProducts ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null
        }
        keyExtractor={(item: Product, index) => item.name}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          console.log("=======================", page);
          if (!loading) {
            getProductsInShop(page).catch(err => {
              throw err;
            });
          }
        }}
        renderItem={({ item: product }) => {
          const isInCart = userData.find(
            (pr: Product) => pr._id === product._id
          );
          const vote = product.listVoters.find(
            elem => elem.voter === userEmail
          );
          const voteUp = vote && vote.vote === "+1";
          const voteDown = vote && vote.vote === "-1";
          return (
            <TouchableOpacity
              key={product.name}
              style={styles.container}
              onPress={() => {
                navigation.navigate("ProductDetails", { product });
              }}
            >
              <Icon name={product.icon} size={35} iconStyle={styles.icon} />
              <Text style={styles.name}>{product.name}</Text>
              <Icon
                name="arrow-drop-down"
                reverse
                color={voteDown ? "red" : undefined}
                onPress={() => {
                  console.log(vote);
                  if (vote && vote.vote === "-1") {
                    return;
                  }
                  voteForProduct(product.name, "-1");
                }}
              />
              <Text style={styles.name}>
                {product.rating ? product.rating : 0}
              </Text>
              <Icon
                name="arrow-drop-up"
                color={voteUp ? "red" : undefined}
                reverse
                onPress={() => {
                  if (vote && vote.vote === "+1") {
                    return;
                  }
                  voteForProduct(product.name, "+1");
                }}
              />
              <Icon
                reverse
                name="add-shopping-cart"
                color="#f50"
                underlayColor="red"
                iconStyle={{
                  backgroundColor: isInCart && "green"
                }}
                onPress={() => {
                  if (isInCart) {
                    deleteProducts(product)
                      .then(() => notification("удалено", "ok"))
                      .catch(() => notification("ошибка", "error"));
                    return;
                  }
                  addProductInList(product).then(response => {
                    getUsersProducts();
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

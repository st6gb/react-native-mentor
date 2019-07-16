import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationScreenProps } from "react-navigation";
import { useDispatch, useSelector, useStore } from "react-redux";
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
import { Product } from "../../interfaces/screen.interface";
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from "./styles";
import {
  requestProduct,
  requestProductInCart as requestAddProductInCart,
  requestDeleteProductInCart,
  requestGetProductInCart,
  requestVoteProduct
} from "../../actions";
import { Store } from "../../store";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const ProductList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { data, loading, page } = useSelector((state: Store) => state.products);
  const { data: userData, fetchUserProducts } = useSelector(
    (state: Store) => state.userProducts
  );
  const store = useStore();
  console.log(store.getState());
  const [userEmail, setUserEmail] = React.useState<string | null>("");
  AsyncStorage.getItem("@name").then(res => setUserEmail(res));
  const { isConnected } = useNetInfo();
  React.useEffect(() => {
    dispatch(requestGetProductInCart());
    if (page === 1 && !loading) {
      dispatch(requestProduct(page));
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
          if (!loading) {
            dispatch(requestProduct(page));
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
                  if (vote && vote.vote === "-1") {
                    return;
                  }
                  dispatch(requestVoteProduct(product.name, "-1"));
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
                  dispatch(requestVoteProduct(product.name, "+1"));
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
                    dispatch(requestDeleteProductInCart(product.name));
                    return;
                  }
                  dispatch(requestAddProductInCart(product.name));
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

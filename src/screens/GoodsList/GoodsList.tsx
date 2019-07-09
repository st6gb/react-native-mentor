import * as React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Animated,
  Easing
} from "react-native";
import { Icon } from "react-native-elements";
import LottieView from "lottie-react-native";
import { Navigation } from "../../interfaces/screen.interface";
import { NavigationScreenProps } from "react-navigation";
import { getUsersProducts, executeOrder } from "../../services/httpClient";
import { UrbanAirship, UACustomEvent } from "urbanairship-react-native";
import { notification } from "../../utils/notification";

import { Product } from "../../interfaces/screen.interface";

import { styles } from "./styles";
import { useHttpClient } from "../../services/useHttpClient";
import { clearUserProducts } from "../../services/HttpClientProvider";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const GoodsList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const [tags, setTags] = React.useState<string[]>([]);
  const {
    getUsersProducts,
    state: {
      userProducts: { data, fetchUserProducts }
    },
    dispatch
  } = useHttpClient();
  React.useEffect(() => {
    UrbanAirship.getTags().then(tags => setTags(tags));
    getUsersProducts();
  }, []);
  return (
    <>
      <LottieView
        source={require("./animations/watermelon.json")}
        autoPlay
        loop
      />
      <ScrollView>
        <View style={styles.products}>
          {fetchUserProducts && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          {!fetchUserProducts &&
            data.map((product: Product) => {
              if (product) {
                return (
                  <TouchableOpacity
                    key={product._id}
                    style={styles.container}
                    onPress={() => {
                      navigation.navigate("ProductDetails", { product });
                    }}
                  >
                    <Icon
                      name={product.icon}
                      size={35}
                      iconStyle={styles.icon}
                    />
                    <Text style={styles.name}>{product.name}</Text>
                  </TouchableOpacity>
                );
              }
            })}
        </View>
        <Button
          title="order"
          onPress={() => {
            executeOrder(tags)
              .then(res => {
                if (res.nModified) return dispatch(clearUserProducts());
                return notification("Empty", "attention");
              })
              .catch(() => notification("Error", "error"));
          }}
        />
      </ScrollView>
    </>
  );
};

// @ts-ignore
GoodsList.navigationOptions = () => {
  return {
    title: "MyProducts",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

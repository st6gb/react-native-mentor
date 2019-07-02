import * as React from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "../../interfaces/screen.interface";
import { NavigationScreenProps } from "react-navigation";
import { getUsersProducts, executeOrder } from "../../services/httpClient";
import { UrbanAirship, UACustomEvent } from "urbanairship-react-native";
import { notification } from "../../utils/notification";
import { Product } from "../../interfaces/screen.interface";

import { styles } from "./styles";

interface Props extends Navigation {
  navigationOptions: NavigationScreenProps;
}

export const GoodsList: React.FunctionComponent<Props> = props => {
  const { navigation } = props;
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [tags, setTags] = React.useState<string[]>([]);
  React.useEffect(() => {
    UrbanAirship.getTags().then(tags => setTags(tags));
    if (products.length === 0) {
      getUsersProducts()
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
              if (res.nModified) return setProducts([]);
              return notification("Empty", "attention");
            })
            .catch(() => notification("Error", "error"));
        }}
      />
    </ScrollView>
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

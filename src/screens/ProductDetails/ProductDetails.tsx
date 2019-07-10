import * as React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import { Navigation } from "../../interfaces/screen.interface";
import { styles } from "./styles";
import { useHttpClient } from "../../services/useHttpClient";

export const ProductDetails: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  const product = navigation.getParam("product");
  const {
    getProduct,
    state: {
      productFullInfo: { info, loading }
    }
  } = useHttpClient();
  React.useEffect(() => {
    getProduct(product._id);
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Icon name={product.icon} size={40} />
        <Text>{product.name}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text>{info.description}</Text>
          <View>
            {info.comments.map(
              (comment: { author: String; body: String; _id: string }) => {
                return (
                  <View key={comment._id}>
                    <Text>Пишет</Text>
                    <Text>{comment.author}</Text>
                    <Text>{comment.body}</Text>
                  </View>
                );
              }
            )}
          </View>
        </View>
      )}
      <Text>Напишите комментарий</Text>
    </View>
  );
};

// @ts-ignore
ProductDetails.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("product").name,
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

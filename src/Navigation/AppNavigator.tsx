import { createStackNavigator, createAppContainer } from "react-navigation";
import { Login, ProductDetails, ProductList } from "../screens";

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    ProductDetails: {
      screen: ProductDetails
    },
    ProductList: {
      screen: ProductList
    }
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);

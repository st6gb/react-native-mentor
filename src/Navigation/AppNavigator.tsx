import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Login, ProductDetails, ProductList } from "../screens";

const AppStack = createStackNavigator({
  ProductList: {
    screen: ProductList
  },
  ProductDetails: {
    screen: ProductDetails
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login
  }
});

const AppDraw = createDrawerNavigator({
  AppStack,
  AuthStack
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AppDraw,
      AuthStack
    },
    {
      initialRouteName: "AuthStack"
    }
  )
);

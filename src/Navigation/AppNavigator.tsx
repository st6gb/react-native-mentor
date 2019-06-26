import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Login, ProductDetails, ProductList, SingUp } from "../screens";

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
  },
  SingUp: {
    screen: SingUp
  }
});

const AppDraw = createDrawerNavigator(
  {
    AppStack,
    AuthStack
  },
  {
    initialRouteName: "AuthStack"
  }
);

export default createAppContainer(AppDraw);

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import {
  Login,
  ProductDetails,
  ProductList,
  SingUp,
  GoodsList
} from "../screens";

const AppStack = createStackNavigator({
  ProductList: {
    screen: ProductList
  },
  ProductDetails: {
    screen: ProductDetails
  },
  GoodsList: {
    screen: GoodsList
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

const AppSwitch = createSwitchNavigator(
  {
    AppStack,
    AuthStack
  },
  {
    initialRouteName: "AuthStack"
  }
);

const AppDraw = createDrawerNavigator(
  {
    AppStack,
    AuthStack
  },
  {
    initialRouteName: "AuthStack"
  }
);

export default createAppContainer(AppSwitch);

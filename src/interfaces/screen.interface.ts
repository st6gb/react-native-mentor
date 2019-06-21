import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface Navigation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
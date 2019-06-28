import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface Navigation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export type Product = {
  _id: string;
  name: string;
  icon: string;
  description: string;
}

export type Products = Product[];

export type User = {
  name: string;
  password: string;
  _id: string;
}
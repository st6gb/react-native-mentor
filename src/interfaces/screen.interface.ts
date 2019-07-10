import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

export interface Navigation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export type Product = {
  _id: string;
  name: string;
  icon: string;
  description?: string;
  rating: Number,
  listVoters: [
    {
      voter: String;
      vote: string;
    }
  ],
  comments?: [
    {
      author: String,
      body: String
    }
  ]
}

export type Products = Product[];

export type User = {
  name: string;
  password: string;
  _id: string;
}
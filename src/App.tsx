import * as React from "react";
import AppNavigator from "./Navigation/AppNavigator";
import { UrbanAirship, UACustomEvent } from "urbanairship-react-native";

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    UrbanAirship.setUserNotificationsEnabled(true);
    UrbanAirship.addTag("someTag");
    return <AppNavigator />;
  }
}

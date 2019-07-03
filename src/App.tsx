import * as React from "react";
import AppNavigator from "./Navigation/AppNavigator";
import { UrbanAirship } from "urbanairship-react-native";
import { Modal, Text, View, Button } from "react-native";
import NetInfo, { isConnected } from "@react-native-community/netinfo";

type Props = {};
export const App: React.FunctionComponent<Props> = () => {
  UrbanAirship.setUserNotificationsEnabled(true);
  UrbanAirship.addTag("someTag");
  const [isConnection, setConnection] = React.useState(false);
  React.useEffect(() => {
    NetInfo.isConnected.addEventListener("connectionChange", setConnection);
    return NetInfo.isConnected.removeEventListener(
      "connectionChange",
      setConnection
    );
  });
  console.log(isConnection);
  return (
    <>
      <Modal animationType="slide" visible={!isConnection}>
        <Text>Network hasn't connection</Text>
        <Button title="try again" onPress={() => setConnection(false)} />
      </Modal>
      <AppNavigator />
    </>
  );
};

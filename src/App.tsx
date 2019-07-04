import * as React from "react";
import AppNavigator from "./Navigation/AppNavigator";
import { UrbanAirship } from "urbanairship-react-native";
import { Modal, Text, View, Button } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useHttpClient } from "./services/useHttpClient";

type Props = {};
export const App: React.FunctionComponent<Props> = () => {
  UrbanAirship.setUserNotificationsEnabled(true);
  UrbanAirship.addTag("someTag");
  const { isConnected } = useNetInfo();
  const [isPushModal, setPushModal] = React.useState(false);
  const [isShowModal, setShowModal] = React.useState(false);
  const {
    state: { lastFunction, lastArguments },
    getProductsInShop
  } = useHttpClient();
  const functions = { getProductsInShop };
  React.useEffect(() => {
    if (!isConnected && !isPushModal) {
      setShowModal(true);
    }
  }, [isConnected]);
  console.log(isConnected);
  return (
    <>
      <Modal animationType="slide" visible={isShowModal}>
        <Text>Network hasn't connection</Text>
        <Text>You should restore network and try again</Text>
        <Button
          title="try again"
          onPress={() => {
            setPushModal(true);
            functions[lastFunction](lastArguments).then(
              ({ docs, nextPage }) => {
                setPushModal(false);
                setShowModal(false);
                console.log(docs, nextPage);
              }
            );
          }}
        />
      </Modal>
      <AppNavigator />
    </>
  );
};

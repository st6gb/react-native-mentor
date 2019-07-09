import * as React from "react";
import SplashScreen from "react-native-splash-screen";
import DeviceInfo from "react-native-device-info";
import AppNavigator from "./Navigation/AppNavigator";
import { UrbanAirship } from "urbanairship-react-native";
import { Modal, Text, View, Button, Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useHttpClient } from "./services/useHttpClient";
import LottieView from "lottie-react-native";
import { Product } from "./interfaces/screen.interface";

type Props = {};
export const App: React.FunctionComponent<Props> = () => {
  UrbanAirship.setUserNotificationsEnabled(true);
  UrbanAirship.addTag("someTag");
  const { isConnected } = useNetInfo();
  const [isPushModal, setPushModal] = React.useState(true);
  React.useEffect(() => {
    console.log(DeviceInfo.getDeviceName());
    SplashScreen.hide();
  }, []);
  return (
    <>
      <Modal animationType="slide" visible={isPushModal}>
        <Text>Welcome, comrade!</Text>
        <Text>{DeviceInfo.getDevice()}</Text>
        <LottieView
          source={require("./assets/animations/watermelon.json")}
          autoPlay
          loop
        />
        <Button
          title="thank you, Pavel"
          onPress={() => {
            setPushModal(false);
          }}
        />
      </Modal>
      <AppNavigator />
    </>
  );
};

import * as React from "react";
import {
  Animated,
  Image,
  TouchableOpacity,
  Easing,
  StyleSheet,
  View
} from "react-native";

import { styles } from "./styles";

type Props = {
  typeImage: string;
};

export const RotateImage: React.FunctionComponent<Props> = ({ typeImage }) => {
  let rotateAn = new Animated.Value(0);
  const rotate = rotateAn.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const spin = () => {
    rotateAn.setValue(0);
    Animated.timing(rotateAn, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start();
  };
  const icons: {
    [key: string]: string;
  } = {
    smile: require("../../assets/smile.png")
  };
  return (
    <TouchableOpacity onPress={spin}>
      <Animated.Image
        style={{
          ...styles.icon,
          transform: [{ rotate: rotate }]
        }}
        source={icons[typeImage]}
      />
    </TouchableOpacity>
  );
};

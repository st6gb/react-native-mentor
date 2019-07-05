import * as React from "react";
import { Animated, Text, View, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export const AnimateTextSpring: React.FunctionComponent<{}> = () => {
  const springValue = new Animated.Value(0.3);
  const spring = () => {
    springValue.setValue(0.3);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1
    }).start();
  };
  return (
    <TouchableOpacity onPress={spring}>
      <Animated.Image
        style={{ width: 120, height: 120, transform: [{ scale: springValue }] }}
        source={{
          uri:
            "https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png"
        }}
      />
    </TouchableOpacity>
  );
};

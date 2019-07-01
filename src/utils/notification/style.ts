import { Platform } from "react-native";

const style = {
  width: 400,
  height: Platform.OS === "ios" ? 50 : 130,
  color: "black",
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  yOffset: 40
};

export const styleOk = {
  ...style,
  backgroundColor: "green"
};

export const styleAttention = {
  ...style,
  backgroundColor: "yellow"
};

export const styleError = {
  ...style,
  backgroundColor: "red"
};
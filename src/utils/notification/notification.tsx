import Toast from "react-native-toast-native";
import { styleError, styleOk, styleAttention } from "./style";

type TypeStyle = "ok" | "attention" | "error";

export const notification = (message: string, type: TypeStyle): void => {
  const style = {
    ok: styleOk,
    attention: styleAttention,
    error: styleError
  };
  return Toast.show(message, Toast.SHORT, Toast.TOP, style[type]);
};

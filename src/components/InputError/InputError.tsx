import * as React from "react";
import { Text } from "react-native";

import { styles } from "./styles";

type Props = {
  errors: any;
  touched: any;
  id: string;
};

export const InputError: React.FunctionComponent<Props> = ({
  errors,
  touched,
  id
}) => {
  const showError = errors[id] && touched[id];
  return showError ? (
    <Text style={styles.errorMessage}>{errors[id]}</Text>
  ) : null;
};

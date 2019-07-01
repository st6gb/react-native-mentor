import * as React from "react";
import { Text } from "react-native";
import { FormikErrors, FormikTouched } from "formik";
import { styles } from "./styles";

type Props = {
  errors: FormikErrors<{
    email: string;
    password: string;
    [key: string]: string;
  }>;
  touched: FormikTouched<{
    email: boolean;
    password: boolean;
    [key: string]: boolean;
  }>;
  id: string;
};

export const InputError: React.FunctionComponent<Props> = ({
  errors,
  touched,
  id
}) => {
  console.log(errors, touched);
  const showError = errors[id] && touched[id];
  return showError ? (
    <Text style={styles.errorMessage}>{errors[id]}</Text>
  ) : null;
};

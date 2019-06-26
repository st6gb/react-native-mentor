import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, Button, Image, Alert } from "react-native";
import { Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-community/async-storage";
import { createNewUser } from "./utils";
import { Navigation } from "../../interfaces/screen.interface";
import { styles } from "./styles";

const SingUpSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required()
});

type Props = {
  errors: any;
  touched: any;
  id: string;
};

const InputError: React.FunctionComponent<Props> = ({
  errors,
  touched,
  id
}) => {
  const showError = errors[id] && touched[id];
  return showError ? (
    <Text style={styles.errorMessage}>{errors[id]}</Text>
  ) : null;
};

export const SingUp: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../../assets/smile.png")} />
      <Text style={styles.title}>Sing UP</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SingUpSchema}
        onSubmit={values => {
          createNewUser(values).then(response => {
            Alert.alert(
              "Alert",
              `${
                response === 200
                  ? "Пользователь успешно создан, перейти на страницу логина?"
                  : "Пользователь уже существует, попробуйте снова"
              }`,
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "OK",
                  onPress: () => (response === 200 ? navigation.goBack() : null)
                }
              ],
              { cancelable: false }
            );
          });
        }}
      >
        {props => (
          <View style={{ width: 400 }}>
            <Input
              placeholder="Login"
              onChangeText={props.handleChange("email")}
              onBlur={props.handleBlur("email")}
              value={props.values.email}
              leftIcon={<Icon name="envelope" size={24} color="black" />}
            />
            <InputError
              errors={props.errors}
              touched={props.touched}
              id="email"
            />
            <Input
              placeholder="password"
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              leftIcon={{ type: "font-awesome", name: "key" }}
            />
            <InputError
              errors={props.errors}
              touched={props.touched}
              id="password"
            />
            <Button
              title="sing up"
              onPress={() => {
                props.handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, Button, Image } from "react-native";
import { Input } from "react-native-elements";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Navigation } from "../../interfaces/screen.interface";
import { styles } from "./styles";

const SingUpSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  password: Yup.string().required()
});

export const Login: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../../assets/smile.png")} />
      <Text style={styles.title}>Friday's shop</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SingUpSchema}
        onSubmit={values => {
          console.log(values);
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
            <Input
              placeholder="password"
              onChangeText={props.handleChange("password")}
              onBlur={props.handleBlur("password")}
              value={props.values.password}
              leftIcon={{ type: "font-awesome", name: "key" }}
            />
            <Button
              title="login"
              onPress={() => {
                props.handleSubmit();
                navigation.navigate("AppDraw");
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

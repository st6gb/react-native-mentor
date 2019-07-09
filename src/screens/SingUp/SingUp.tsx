import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  Animated,
  Easing,
  EasingStatic,
  EasingFunction
} from "react-native";
import { Input } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import { createNewUser, createNewUserV2 } from "../../services/httpClient";
import { InputError } from "../../components/InputError";
import { Navigation } from "../../interfaces/screen.interface";
import { styles } from "./styles";

const SingUpSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required()
});

export const SingUp: React.FunctionComponent<Navigation> = props => {
  const { navigation } = props;
  const animatedValueEmail = new Animated.Value(0);
  const animatedValueSingUp = new Animated.Value(0);
  const animatedValueText = new Animated.Value(0);

  const animate = () => {
    animatedValueEmail.setValue(0);
    animatedValueText.setValue(0);
    animatedValueSingUp.setValue(0);
    const createAnimation = function(
      value: Animated.Value,
      duration: number,
      easing: EasingFunction,
      delay = 0
    ) {
      return Animated.timing(value, {
        toValue: 1,
        duration,
        easing,
        delay
      });
    };
    Animated.sequence([
      createAnimation(animatedValueSingUp, 1000, Easing.ease, 2000),
      createAnimation(animatedValueEmail, 1000, Easing.ease, 1000),
      createAnimation(animatedValueText, 2000, Easing.ease)
    ]).start();
  };
  const introEmail = animatedValueEmail.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"]
  });
  const scaleText = animatedValueText.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2]
  });
  const introButton = animatedValueSingUp.interpolate({
    inputRange: [0, 1],
    outputRange: [700, 0]
  });

  React.useEffect(() => {
    animate();
  });

  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={require("../../assets/smile.png")} />
      <Animated.View style={{ transform: [{ scale: scaleText }] }}>
        <Text style={styles.title}>Sing UP</Text>
      </Animated.View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SingUpSchema}
        onSubmit={values => {
          createNewUserV2(values).then(response => {
            Alert.alert(
              "Alert",
              `${
                !response.message
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
                  onPress: () =>
                    !response.message ? navigation.goBack() : null
                }
              ],
              { cancelable: false }
            );
          });
        }}
      >
        {props => (
          <View style={{ width: 400 }}>
            <Animated.View
              style={{ marginTop: 20, transform: [{ rotate: introEmail }] }}
            >
              <Input
                placeholder="Login"
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
                leftIcon={<Icon name="envelope" size={24} color="black" />}
              />
            </Animated.View>

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
            <Animated.View style={{ marginBottom: introButton }}>
              <Button
                title="sing up"
                onPress={() => {
                  props.handleSubmit();
                }}
              />
            </Animated.View>
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

import AsyncStorage from "@react-native-community/async-storage";

export const LoginIn = async (navigation: any, values: any) => {
  try {
    const resp = await fetch("http://10.27.11.60:3001/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        name: values.email,
        password: values.password
      })
    });
    const json = await resp.json();
    if (resp.status !== 200) return;
    await AsyncStorage.setItem("@token", JSON.stringify(json));
    navigation.navigate("AppStack");
  } catch (err) {
    console.log(err);
  }
}
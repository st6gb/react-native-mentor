import AsyncStorage from "@react-native-community/async-storage";

export const getUsersProducts = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token === null) throw ('lala');
    const strToken = JSON.parse(token);
    const response = await fetch("http://10.27.11.60:3001/userProduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: strToken.token,
      },
      mode: "cors",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    throw (err);
  }
}
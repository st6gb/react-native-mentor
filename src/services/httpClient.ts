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
};

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
};

export const getProductsInShop = async () => {
  try {
    const response = await fetch("http://10.27.11.60:3001/products");
    const json = await response.json();
    return json;
  } catch (err) {
    throw (err);
  }
};

export const addProductInList = async (product: any) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token === null) throw ('lala');
    const strToken = JSON.parse(token);
    console.log(strToken);
    const response = await fetch('http://10.27.11.60:3001/setProduct', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: strToken.token,
      },
      mode: "cors",
      body: JSON.stringify(product)
    })
    return response.json();
  } catch (err) {
    throw (err);
  }
};

export const createNewUser = async (values: any) => {
  try {
    const resp = await fetch("http://10.27.11.60:3001/new-user", {
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
    return resp.status;
  } catch (err) {
    console.log(err);
  }
};
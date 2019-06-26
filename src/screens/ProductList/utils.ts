import AsyncStorage from "@react-native-community/async-storage";

export const getProductsInShop = async () => {
  try {
    const response = await fetch("http://10.27.11.60:3001/products");
    const json = await response.json();
    return json;
  } catch (err) {
    throw (err);
  }
}

export const addProductinList = async (product: any) => {
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
}
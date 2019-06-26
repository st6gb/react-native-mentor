import AsyncStorage from "@react-native-community/async-storage";

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
    return err;
  }
}
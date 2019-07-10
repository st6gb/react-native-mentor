import AsyncStorage from "@react-native-community/async-storage";
import { notification } from "../utils/notification";

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
    if (resp.status !== 200) {
      notification("логин или пароль не верный", "error");
      return;
    }
    await AsyncStorage.setItem("@token", JSON.stringify(json));
    await AsyncStorage.setItem("@name", values.email);
    navigation.navigate("AppStack");
  } catch (err) {
    console.log(err);
  }
};


export const addProductInList = async (product: any) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token === null) throw ('error');
    const strToken = JSON.parse(token);
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

export const executeOrder = async (tags: string[]) => {
  try {
    const token = await AsyncStorage.getItem('@token');
    if (token === null) throw ('error');
    const strToken = JSON.parse(token);
    const response = await fetch("http://10.27.11.60:3001/executeOrder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: strToken.token,
        tags: JSON.stringify(tags)
      },
      mode: "cors",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
  }
}

export const createNewUserV2 = async (values: { email: string, password: string }) => {
  try {
    const result = await httpClient.post(
      "http://10.27.11.60:3001/new-user",
      {
        name: values.email,
        password: values.password
      }
    );
    console.log(result);
    return result;
  } catch (err) {
    throw new Error(err);
  }

}

export const httpClient = {
  async getAuthToken() {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (token === null) return "";
      return JSON.parse(token).token;
    } catch (err) {
      throw new Error(`Request failed: ${err.message}`)
    }
  },
  async get(url: string) {
    try {
      const token = await this.getAuthToken();
      const headers = new Headers({
        'Cache-Control': 'no-cache',
        "Content-Type": "application/json",
        Accept: "application/json",
        token,
      });
      const rawResponse = await fetch(url, {
        method: 'GET',
        headers,
      });
      if (rawResponse.status >= 400) {
        throw new Error('Внутренняя ошибка сервера');
      }
      const response = await rawResponse.json();
      return response;
    } catch (err) {
      throw new Error(`Request failed: ${err.message}`);
    }
  },
  async sendRequest<T>(method: 'POST' | 'PUT' | 'DELETE', url: string, body?: T) {
    try {
      const token = await this.getAuthToken();
      const headers = new Headers({
        'Cache-Control': 'no-cache',
        "Content-Type": "application/json",
        Accept: "application/json",
        token,
      });
      const rawResponse = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers
      });
      const response = await rawResponse.json();
      return response;
    } catch (err) {
      throw new Error(`Request failed: ${err.message}`);
    }
  },
  async post<T>(
    url: string,
    body?: T,
  ) {
    return this.sendRequest('POST', url, body);
  },

  async put<T>(
    url: string,
    body?: T,
  ) {
    const method = 'PUT';
    return this.sendRequest(method, url, body);
  },

  async delete<T>(
    url: string,
    body?: T,
  ) {
    const method = 'DELETE';
    return this.sendRequest(method, url, body);
  },
}
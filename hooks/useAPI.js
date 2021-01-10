import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://yjsoon.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export function useUsername(signoutCallback) {
  async function getUsername() {
    console.log("---- Getting user name ----");
    const token = await AsyncStorage.getItem("token");
    if (token == null) {
      signoutCallback();
      return null;
    }
    console.log(`Token is ${token}`);
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      return response.data.username;
    } catch (error) {
      console.log("Error getting user name");
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signoutCallback();
          return null;
        }
      } else {
        console.log(error);
      }
      return null;
    }
  }

  return getUsername;
}

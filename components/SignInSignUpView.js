import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://yjsoon.pythonanywhere.com";
const API_LOGIN = "/auth";
const API_SIGNUP = "/newuser";

export default function SignInSignUpView({ navigation, isSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup() {
    console.log("---- Signing up ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      await axios.post(API + API_SIGNUP, {
        username,
        password,
      });
      console.log("Success signing up!");
      login();
    } catch (error) {
      setLoading(false);
      console.log("Error signing up!");
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
  }

  async function login() {
    console.log("---- Login time ----");
    Keyboard.dismiss();

    try {
      setLoading(true);
      const response = await axios.post(API + API_LOGIN, {
        username,
        password,
      });
      console.log("Success logging in!");
      // console.log(response);
      await AsyncStorage.setItem("token", response.data.access_token);
      setLoading(false);
      navigation.navigate("Account");
    } catch (error) {
      setLoading(false);
      console.log("Error logging in!");
      console.log(error.response);
      setErrorText(error.response.data.description);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isSignIn ? "Log in to blog" : "Sign up for an account"}
        </Text>
        <Text style={styles.fieldTitle}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={username}
          onChangeText={(input) => setUsername(input)}
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={isSignIn ? login : signup}
            style={styles.loginButton}
          >
            <Text style={styles.buttonText}>
              {isSignIn ? "Log in" : "Sign up"}
            </Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} /> // adjust
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(isSignIn ? "SignUp" : "SignIn");
          }}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isSignIn
              ? "Register for a new account"
              : "Have an account? Sign in"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{errorText}</Text>
        <View style={{ height: 20, alignItems: "left" }}></View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchText: {
    color: "blue",
  },
  errorText: {
    color: "red",
    height: 40,
  },
});

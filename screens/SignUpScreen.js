import React from "react";
import { StyleSheet } from "react-native";
import SignInSignUpView from "../components/SignInSignUpView";

export default function SignUpScreen({ navigation }) {
  return <SignInSignUpView navigation={navigation} isSignIn={false} />;
}

const styles = StyleSheet.create({});

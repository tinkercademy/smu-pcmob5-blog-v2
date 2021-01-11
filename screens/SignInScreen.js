import React from "react";
import { StyleSheet } from "react-native";
import SignInSignUpView from "../components/SignInSignUpView";

export default function SignInScreen({ navigation }) {
  return <SignInSignUpView navigation={navigation} isSignIn={true} />;
}

const styles = StyleSheet.create({});

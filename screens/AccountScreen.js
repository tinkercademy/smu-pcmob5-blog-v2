import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsername } from "../hooks/useAPI";
import { useDispatch } from "react-redux";
import { signOutAction } from "../redux/ducks/blogAuth";

export default function AccountScreen({ navigation }) {
  const [username, loading, error, refresh] = useUsername();
  const dispatch = useDispatch();

  // signs out if the useUsername hook returns error as true
  useEffect(() => {
    console.log("Signing out");
    if (error) {
      signOut();
    }
  }, [error]);

  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      refresh(true);
    });
    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    dispatch(signOutAction());
  }

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      {loading ? <ActivityIndicator /> : <Text>{username}</Text>}
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

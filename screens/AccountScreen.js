import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsername } from "../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../redux/ducks/blogAuth";
import { toggleDarkMode } from "../redux/ducks/accountPrefs";

export default function AccountScreen({ navigation }) {
  const [username, loading, error, refresh] = useUsername();
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);
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
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: "black" },
      ]}
    >
      <Text style={[styles.titleText, isDarkModeOn && { color: "white" }]}>
        Account Screen
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.usernameText}>{username}</Text>
      )}
      <View style={styles.horizontalBlock}>
        <Text style={isDarkModeOn && { color: "white" }}>Dark mode</Text>
        <Switch
          value={isDarkModeOn}
          onValueChange={() => dispatch(toggleDarkMode())}
        />
      </View>
      <Text> {isDarkModeOn ? "DARK MODE ON" : "DARK MODE OFF"}</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  usernameText: {
    fontSize: 18,
    color: "grey",
    marginBottom: 12,
  },
  horizontalBlock: {
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
    flexDirection: "row",
  },
});

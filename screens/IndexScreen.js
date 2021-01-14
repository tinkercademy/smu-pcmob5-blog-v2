import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { useSelector } from "react-redux";

export default function IndexScreen({ navigation }) {
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);

  return (
    <View
      style={[
        commonStyles.container,
        isDarkModeOn && { backgroundColor: "black" },
      ]}
    >
      <Text style={isDarkModeOn && { color: "white" }}>Index Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function AccountScreen({ navigation }) {
  function signOut() {}

  return (
    <View style={commonStyles.container}>
      <Text>Account Screen</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({});

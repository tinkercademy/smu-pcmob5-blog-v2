import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabStack from "./components/TabStack";
import { useSelector, useDispatch, Provider } from "react-redux";
import { signInAction } from "./redux/ducks/blogAuth";
import store from "./redux/createStore";

const Stack = createStackNavigator();

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.auth.signedIn);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(signInAction());
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {signedIn ? (
        <TabStack />
      ) : (
        <Stack.Navigator
          mode="modal"
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
        >
          <Stack.Screen component={SignInScreen} name="SignIn" />
          <Stack.Screen component={SignUpScreen} name="SignUp" />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

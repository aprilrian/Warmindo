import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Management from "./Management";
import WarungDetail from "./WarungDetail";
import MenuData from "./MenuData";
import WarungData from "./WarungData";
import WelcomeScreen from "./WelcomeScreen";
import WarungScreen from "./WarungScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="WarungDetail" component={WarungDetail} />
        <Stack.Screen name="Management" component={Management} />
        <Stack.Screen name="MenuData" component={MenuData} />
        <Stack.Screen name="WarungData" component={WarungData} />
        <Stack.Screen name="WarungScreen" component={WarungScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

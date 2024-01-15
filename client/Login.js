import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://192.168.147.81:3000/login", {
        username,
        password,
      });

      const result = response.data;

      if (result.success) {
        navigation.navigate("Dashboard", { username });
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("./assets/chef.png")} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Login</Text>
        <View style={styles.space}></View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#FFFFFF"
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          placeholderTextColor="#FFFFFF"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("./assets/bg-welcome.png")}
        style={styles.bg}
        resizeMode="contain" // Atur resizeMode ke "cover" atau "contain" sesuai kebutuhan
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  space: {
    height: 2,
  },
  bg: {
    height: "50%", // Sesuaikan dengan ukuran yang diinginkan
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    borderBottomWidth: 1, // Lebar border bottom
    borderBottomColor: "#FFFFFF", // Warna border bottom
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },

  input: {
    height: 40,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "white",
  },
  button: {
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;

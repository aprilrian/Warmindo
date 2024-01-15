import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Selamat Datang Di Aplikasi Warmindo AF</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.instructions}>
          Silahkan Klik Lanjutkan Untuk Melakukan Login
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Lanjutkan</Text>
      </TouchableOpacity>
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
    margin: 0,
    padding: 0,
    backgroundColor: "#1a1a1a", // Dark mode - Warna latar belakang
  },
  bg: {
    height: "50%", // Sesuaikan dengan ukuran yang diinginkan
    width: "100%",
  },
  box: {
    backgroundColor: "#2c2c2c",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#444",
  },
  text: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#ccc",
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#8e44ad",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default WelcomeScreen;

// Import modul dan komponen yang diperlukan
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Management = () => {
  const navigation = useNavigation();

  const navigateToMenuData = () => {
    navigation.navigate("MenuData");
  };

  const navigateToWarungData = () => {
    navigation.navigate("WarungData");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("./assets/daun.png")} style={styles.logo} />
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Management Data</Text>

        <TouchableOpacity
          style={styles.linkButtonUserData}
          onPress={navigateToMenuData}
        >
          <FontAwesomeIcon name="cutlery" size={24} color="#fff" />
          <Text style={styles.linkButtonText}>Data Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButtonRoleData}
          onPress={navigateToWarungData}
        >
          <FontAwesomeIcon name="building" size={24} color="#fff" />
          <Text style={styles.linkButtonText}>Data Warung</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Gaya komponen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "80%",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    borderBottomWidth: 1, // Lebar border bottom
    borderBottomColor: "#FFFFFF",
    color: "#fff",
  },
  logo: {
    height: 150,
    width: 100,
  },
  linkButtonUserData: {
    backgroundColor: "#8e44ad",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  linkButtonRoleData: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#8e44ad",
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Management;

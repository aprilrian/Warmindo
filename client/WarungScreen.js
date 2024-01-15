import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const WarungScreen = () => {
  const [dataWarung, setDataWarung] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataWarung();
  }, []);

  const fetchDataWarung = async () => {
    try {
      const response = await axios.get("http://192.168.147.81:3000/datawarung");
      setDataWarung(response.data);
    } catch (error) {
      console.error("Error fetching data warung:", error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownTransaksi = () => {
    setIsDropdownTransaksiOpen(!isDropdownTransaksiOpen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <TouchableOpacity style={styles.tableHeader} onPress={toggleDropdown}>
          <Text style={styles.tableHeaderText}>Data Warung</Text>
          <AntDesign
            name={isDropdownOpen ? "up" : "down"}
            size={16}
            color="#fff"
          />
        </TouchableOpacity>

        {isDropdownOpen && (
          <FlatList
            data={dataWarung}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dataRow}
                onPress={() => {
                  navigation.navigate("WarungDetail", item);
                }}
              >
                <Text style={styles.dataText}>{item.namacabang}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
  },
  table: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dataText: {
    fontSize: 16,
    color: "white",
  },
  managementButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 30,
    height: 30,
  },
});

export default WarungScreen;

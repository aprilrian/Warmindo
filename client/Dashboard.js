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

const Dashboard = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownTransaksiOpen, setIsDropdownTransaksiOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDataTransaksi();
  }, []);

  const fetchDataTransaksi = async () => {
    try {
      const response = await axios.get("http://192.168.147.81:3000/transaksi");
      setDataTransaksi(response.data);
    } catch (error) {
      console.error("Error fetching data transaksi:", error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownTransaksi = () => {
    setIsDropdownTransaksiOpen(!isDropdownTransaksiOpen);
  };

  const navigateToManagement = () => {
    navigation.navigate("Management");
  };
  const navigateToWarungScreen = () => {
    navigation.navigate("WarungScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <TouchableOpacity
          style={styles.tableHeader}
          onPress={toggleDropdownTransaksi}
        >
          <Text style={styles.tableHeaderText}>Data Transaksi</Text>
          <AntDesign
            name={isDropdownTransaksiOpen ? "up" : "down"}
            size={16}
            color="#fff"
          />
        </TouchableOpacity>

        {isDropdownTransaksiOpen && (
          <FlatList
            data={dataTransaksi}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.dataRow}>
                <Text style={styles.dataText}>{item.id}</Text>
                <Text style={styles.dataText}>{item.total}</Text>
                <Text style={styles.dataText}>{formatDate(item.tanggal)}</Text>
                <Text style={styles.dataText}>{item.shift}</Text>
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.warungButton}
        onPress={navigateToWarungScreen}
      >
        <Text style={styles.buttonText}>Warung Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.managementButton}
        onPress={navigateToManagement}
      >
        <Text style={styles.buttonText}>Manajemen Data</Text>
      </TouchableOpacity>
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
  warungButton: {
    borderWidth: 1,
    borderColor: "#8e44ad",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
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
    backgroundColor: "#8e44ad",
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

export default Dashboard;

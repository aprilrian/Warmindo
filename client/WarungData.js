import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";

const WarungData = () => {
  // State untuk mengelola data dari panggilan API
  const [dataWarung, setDataWarung] = useState([]);
  const [newWarung, setNewWarung] = useState({
    namacabang: "",
    alamat: "",
    jumlahpegawai: "",
  });
  const [editWarung, setEditWarung] = useState(null); // Menyimpan data warung yang akan di-edit
  const [showForm, setShowForm] = useState(false);

  // useEffect untuk mengambil data saat komponen dipasang
  useEffect(() => {
    fetchDataWarung();
  }, []);

  // Fungsi untuk menangani operasi CRUD pada warung
  const fetchDataWarung = async () => {
    try {
      const response = await axios.get("http://192.168.147.81:3000/datawarung");
      console.log("Data Warung from server:", response.data);
      setDataWarung(response.data);
    } catch (error) {
      console.error("Error fetching data warung:", error.message);
    }
  };

  const handleAddWarung = async () => {
    try {
      const response = await axios.post(
        "http://192.168.147.81:3000/addwarung",
        newWarung
      );
      console.log("Warung added:", response.data);
      fetchDataWarung();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding warung:", error.message);
    }
  };

  const handleDeleteWarung = async (warungId) => {
    try {
      const response = await axios.delete(
        `http://192.168.147.81:3000/deletewarung/${warungId}`
      );
      console.log("Warung deleted:", response.data);
      fetchDataWarung();
    } catch (error) {
      console.error("Error deleting warung:", error.message);
    }
  };

  const handleEditWarung = (warung) => {
    setEditWarung(warung);
    setNewWarung({
      namacabang: warung.namacabang,
      alamat: warung.alamat,
      jumlahpegawai: warung.jumlahpegawai,
    });
    setShowForm(true);
  };

  const handleUpdateWarung = async () => {
    try {
      const response = await axios.put(
        `http://192.168.147.81:3000/updatewarung/${editWarung.id}`,
        newWarung
      );
      console.log("Warung updated:", response.data);
      fetchDataWarung();
      setShowForm(false);
      setEditWarung(null);
    } catch (error) {
      console.error("Error updating warung:", error.message);
    }
  };

  // JSX untuk antarmuka pengguna layar manajemen warung
  return (
    <View style={styles.halamanDashboard}>
      <View style={styles.centeredContent}>
        <Image source={require("./assets/stg.png")} style={styles.logo} />
      </View>
      <View style={styles.separator} />
      <View style={styles.separator} />

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama Warung"
            value={newWarung.namacabang}
            onChangeText={(text) =>
              setNewWarung({ ...newWarung, namacabang: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={newWarung.alamat}
            onChangeText={(text) =>
              setNewWarung({ ...newWarung, alamat: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Jumlah Pegawai"
            value={newWarung.jumlahpegawai}
            onChangeText={(text) =>
              setNewWarung({ ...newWarung, jumlahpegawai: text })
            }
          />
          {editWarung ? (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateWarung}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddWarung}
            >
              <Text style={styles.buttonText}>Tambah</Text>
            </TouchableOpacity>
          )}
          <View style={styles.separator} />
        </View>
      )}
      <View style={styles.separator} />
      <View style={styles.separator} />
      <FlatList
        data={dataWarung}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text>Nama Cabang: {item.namacabang}</Text>
            <Text>Alamat: {item.alamat}</Text>
            <Text>Jumlah Pegawai: {item.jumlahpegawai}</Text>
            <TouchableOpacity onPress={() => handleEditWarung(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteWarung(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditWarung(null);
          setShowForm(!showForm);
        }}
      >
        <Text style={styles.buttonText}>
          {editWarung ? "Cancel Edit" : "Tambah Warung"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  halamanDashboard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  addButton: {
    backgroundColor: "#8e44ad",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  centeredContent: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center content vertically
    justifyContent: "center", // Center content horizontally
    marginBottom: 20, // Optional: Adjust margin as needed
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 10,
  },
  linkButtonUserData: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row", // Align icon and text horizontally
    justifyContent: "center", // Center content horizontally
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10, // Add some spacing between icon and text
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: "#8e44ad",

    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  dataItem: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  editButton: {
    color: "#3498db",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  deleteButton: {
    color: "#e74c3c",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default WarungData;

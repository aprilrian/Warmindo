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
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

const MenuData = () => {
  // State untuk mengelola data dari panggilan API
  const [dataMenu, setDataMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    nama: "",
    kategori: "",
    harga: "",
    stok: "",
  });
  const [editItem, setEditItem] = useState(null); // Menyimpan data item yang akan di-edit
  const [showForm, setShowForm] = useState(false);

  // useEffect untuk mengambil data saat komponen dipasang
  useEffect(() => {
    fetchDataMenu();
  }, []);

  // Fungsi untuk menangani operasi CRUD pada item menu
  const fetchDataMenu = async () => {
    try {
      const response = await axios.get("http://192.168.147.81:3000/datamenu");
      console.log("Data Menu from server:", response.data);
      setDataMenu(response.data);
    } catch (error) {
      console.error("Error fetching data menu:", error.message);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post(
        "http://192.168.147.81:3000/addmenu",
        newItem
      );
      console.log("Item added:", response.data);
      fetchDataMenu();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://192.168.147.81:3000/deletemenu/${itemId}`
      );
      console.log("Item deleted:", response.data);
      fetchDataMenu();
    } catch (error) {
      console.error("Error deleting item:", error.message);
    }
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setNewItem({
      nama: item.nama,
      kategori: item.kategori,
      harga: item.harga,
      stok: item.stok,
    });
    setShowForm(true);
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(
        `http://192.168.147.81:3000/updatemenu/${editItem.id}`,
        newItem
      );
      console.log("Item updated:", response.data);
      fetchDataMenu();
      setShowForm(false);
      setEditItem(null);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  // JSX untuk antarmuka pengguna layar data menu
  return (
    <View style={styles.halamanDashboard}>
      <View style={styles.centeredContent}>
        <Image source={require("./assets/menu.png")} style={styles.logo} />
      </View>
      <View style={styles.separator} />
      <View style={styles.separator} />

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={newItem.nama}
            onChangeText={(text) => setNewItem({ ...newItem, nama: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Kategori"
            value={newItem.kategori}
            onChangeText={(text) => setNewItem({ ...newItem, kategori: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga"
            value={newItem.harga}
            onChangeText={(text) => setNewItem({ ...newItem, harga: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Stok"
            value={newItem.stok}
            onChangeText={(text) => setNewItem({ ...newItem, stok: text })}
          />
          {editItem ? (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateItem}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.buttonText}>Tambah</Text>
            </TouchableOpacity>
          )}
          <View style={styles.separator} />
        </View>
      )}
      <View style={styles.separator} />
      <View style={styles.separator} />
      <FlatList
        data={dataMenu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.dataItem}>
            <Text>Nama: {item.nama}</Text>
            <Text>Kategori: {item.kategori}</Text>
            <Text>Harga: {item.harga}</Text>
            <Text>Stok: {item.stok}</Text>
            <TouchableOpacity onPress={() => handleEditItem(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditItem(null);
          setShowForm(!showForm);
        }}
      >
        <Text style={styles.buttonText}>
          {editItem ? "Cancel Edit" : "Tambah Menu"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  halamanDashboard: {
    backgroundColor: "#1a1a1a",
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  logo: {
    marginTop: 20,
    width: 150,
    height: 150,
    resizeMode: "contain",
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
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#8e44ad",
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

export default MenuData;

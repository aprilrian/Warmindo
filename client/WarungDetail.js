import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const WarungDetail = ({ route }) => {
  const { namacabang, alamat, jumlahpegawai } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <Text style={styles.title}>Detail Warung</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Nama Cabang:</Text>
          <Text style={styles.value}>{namacabang}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Alamat:</Text>
          <Text style={styles.value}>{alamat}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Jumlah Pegawai:</Text>
          <Text style={styles.value}>{jumlahpegawai}</Text>
        </View>
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
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    width: "80%", // Sesuaikan lebar konten yang diinginkan
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: "center",
  },
  box: {
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  value: {
    fontSize: 16,
    color: "white",
  },
});

export default WarungDetail;

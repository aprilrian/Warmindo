const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Membuat koneksi ke MySQL (gantilah dengan informasi koneksi Anda)
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "BismillahKaya123",
  database: "warmindo",
});

// Middleware untuk mengizinkan akses dari frontend (gantilah origin dengan domain frontend Anda)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware untuk parsing JSON dari body request
app.use(bodyParser.json());


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Query ke database
  connection.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      } else {
        if (results.length > 0) {
          res.status(200).json({ success: true, message: "Login successful" });
        } else {
          res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
      }
    }
  );
});

// Contoh penambahan logging pada endpoint /datawarung
app.get("/datawarung", (req, res) => {
  const query = "SELECT * FROM datawarung";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching datawarung:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data Warung:", results); // Tambahkan ini untuk melihat data yang diambil
    res.json(results);
  });
});

app.get("/transaksi", (req, res) => {
  const query = "SELECT * FROM transaksi";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching transaksi:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data Transaksi:", results); // Tambahkan ini untuk melihat data yang diambil
    res.json(results);
  });
});

app.get("/datamenu", (req, res) => {
  const query = "SELECT * FROM menu";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching menu:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Data Menu:", results);
    res.json(results);
  });
});

app.post("/addmenu", (req, res) => {
  const { nama, kategori, harga, stok } = req.body;

  const query =
    "INSERT INTO menu (nama, kategori, harga, stok) VALUES (?, ?, ?, ?)";
  connection.query(query, [nama, kategori, harga, stok], (err, results) => {
    if (err) {
      console.error("Error adding menu:", err.message);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    console.log("Menu added:", results);
    res.json({ success: true });
  });
});

app.delete("/deletemenu/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM menu WHERE id = ?";
  connection.query(query, [itemId], (err, results) => {
    if (err) {
      console.error("Error deleting menu:", err.message);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    console.log("Menu deleted:", results);
    res.json({ success: true });
  });
});

app.put("/updatemenu/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  const query =
    "UPDATE menu SET nama = ?, kategori = ?, harga = ?, stok = ? WHERE id = ?";
  connection.query(
    query,
    [
      updatedItem.nama,
      updatedItem.kategori,
      updatedItem.harga,
      updatedItem.stok,
      itemId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating menu:", err.message);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log("Menu updated:", results);
      res.json({ success: true, message: "Item updated" });
    }
  );
});

app.post("/addwarung", (req, res) => {
  const { namacabang, alamat, jumlahpegawai } = req.body;

  const query =
    "INSERT INTO datawarung (namacabang, alamat, jumlahpegawai) VALUES (?, ?, ?)";
  connection.query(
    query,
    [namacabang, alamat, jumlahpegawai],
    (err, results) => {
      if (err) {
        console.error("Error adding warung:", err.message);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log("Warung added:", results);
      res.json({ success: true });
    }
  );
});

app.delete("/deletewarung/:id", (req, res) => {
  const warungId = req.params.id;

  const query = "DELETE FROM datawarung WHERE id = ?";
  connection.query(query, [warungId], (err, results) => {
    if (err) {
      console.error("Error deleting warung:", err.message);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }

    console.log("Warung deleted:", results);
    res.json({ success: true });
  });
});

app.put("/updatewarung/:id", (req, res) => {
  const warungId = parseInt(req.params.id);
  const updatedWarung = req.body;

  const query =
    "UPDATE datawarung SET namacabang = ?, alamat = ?, jumlahpegawai = ? WHERE id = ?";
  connection.query(
    query,
    [
      updatedWarung.namacabang,
      updatedWarung.alamat,
      updatedWarung.jumlahpegawai,
      warungId,
    ],
    (err, results) => {
      if (err) {
        console.error("Error updating warung:", err.message);
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      console.log("Warung updated:", results);
      res.json({ success: true });
    }
  );
});

// Menjalankan server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

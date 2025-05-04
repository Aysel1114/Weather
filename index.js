const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'Weather'
});
  
app.get('/login', (req, res) => {
    connection.query('SELECT * FROM users;', 
    (err, data) => {
      if (err) return res.status(500);
      res.json(data);
      console.log(data);
    })
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  connection.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("Verilənlər bazasına əlavə edərkən səhv baş verdi: ", err);
      return res.status(500).json({ message: "Qeydiyyat uğursuz oldu." });
    }
    res.status(201).json({ message: "Qeydiyyat uğurla tamamlandı!" });
  });
});

// Giriş əməliyyatı
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Verilənlər bazasında səhv baş verdi: ", err);
      return res.status(500).json({ message: "Daxil olma zamanı səhv baş verdi." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı." });
    }

    const admin = results[0];
    if (password !== admin.password) {
      return res.status(401).json({ message: "Şifrə səhvdir." });
    }

    res.status(200).json({ message: "Daxil olma uğurla tamamlandı!" });
  });
});
  

app.listen(5000, () => {
  console.log('Server 5000 portunda işə düşdü.');
});
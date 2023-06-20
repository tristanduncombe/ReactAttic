const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const connection = mysql.createConnection({
  host: 'mariadb',
  user: 'php',
  password: 'php',
  database: 'attic'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.get('/courses', (req, res) => {
  // Query the database for all courses
  connection.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving courses from database');
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
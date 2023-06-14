const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
  connection.query('SELECT * FROM courses', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving courses from database');
    } else {
      res.json(result);
    }
  });
});

module.exports = app;
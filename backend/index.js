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

app.get('/course/id/:id', (req, res) => {
  const courseId = req.params.id;
  // Query the database for the course with the specified ID
  connection.query('SELECT course_id FROM courses WHERE course_name = ?', [courseId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error retrieving course with ID ${courseId} from database`);
    } else if (results.length === 0) {
      res.status(404).send(`Course with ID ${courseId} not found`);
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results[0]);
    }
  });
});

app.get('/course/:id', (req, res) => {
  const courseId = req.params.id;
  // Query the database for the course with the specified ID
  connection.query('SELECT * FROM courses WHERE course_id = ?', [courseId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error retrieving course with ID ${courseId} from database`);
    } else if (results.length === 0) {
      res.status(404).send(`Course with ID ${courseId} not found`);
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results[0]);
    }
  });
});

app.get('/course/:id/assessments', (req, res) => {
  const courseId = req.params.id;
  // Query the database for the course with the specified ID
  connection.query('SELECT * FROM assessmentItem WHERE course_id = ?', [courseId], (err, results) => {
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
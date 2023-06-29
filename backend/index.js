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

app.get('/exam/:id', (req, res) => {
  const assessmentId = req.params.id;
  // Query the database for the course with the specified ID

  let response = { questions: [], answers: [], assessmentItem: null, user: null };
  connection.query('SELECT * FROM assessmentQuestion WHERE assessment = ?', [assessmentId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error exam data from database');
    } else {
      response.questions = results;

      connection.query('SELECT * FROM assessmentResponse WHERE assessmentItem = ?', [assessmentId], (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error exam data from database');
        } else {
          response.answers = results;

          // Get all unique user IDs from questions and answers
          const userIds = [...new Set([...response.questions.map((q) => q.user), ...response.answers.map((a) => a.user)])];

          // Fetch user information for each user ID
          connection.query('SELECT * FROM user WHERE user IN (?)', [userIds], (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).send('Error exam data from database');
            } else {
              response.user = results;
              connection.query('SELECT * FROM assessmentItem WHERE assessment_id = ?', [assessmentId], (err, results) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Error exam data from database');
                } else {
                  response.assessmentItem = results[0];
                  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                  res.json(response);
                }
              });
            }
          });
        }
      });
    }
  });
});

app.get('/like/:response', (req, res) => {
  const response = req.params.response;
  // Query the database for the sum of opinions for the specified response
  connection.query('SELECT SUM(opinion) AS sum FROM assessmentResponseLike WHERE response = ?', [response], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving likes from database');
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results[0].sum);
    }
  });
});

app.get('/like/:response/:user', (req, res) => {
  const response = req.params.response;
  const user = req.params.user;
  // Query the database for the user's opinion for the specified response
  connection.query('SELECT opinion FROM assessmentResponseLike WHERE response = ? AND user = ?', [response, user], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving like from database');
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      if (results.length > 0) {
        res.json(results[0].opinion);
      } else {
        res.json(0);
      }
    }
  });
});

app.get('/like/:response/:user/:opinion', (req, res) => {
  const response = req.params.response;
  const user = req.params.user;
  const opinion = req.params.opinion;
  // Insert a new row into the assessmentResponseLike table with the specified user, response, and opinion
  // If a duplicate user and response combination is found, update the existing row with the new opinion value
  connection.query('INSERT INTO assessmentResponseLike (user, response, opinion) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE opinion = ?', [user, response, opinion, opinion], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting like into database');
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send('Like inserted successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
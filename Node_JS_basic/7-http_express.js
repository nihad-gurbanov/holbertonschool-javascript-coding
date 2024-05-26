const express = require('express');
const fs = require('fs');

const app = express();

// Function to read file asynchronously
const readFileAsync = (filename) => new Promise((resolve, reject) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// Function to parse CSV file and count students by department
const parseCSV = (data) => {
  const students = {
    CS: [],
    SWE: [],
  };

  const lines = data.split('\n').filter((line) => line.trim() !== ''); // Removing empty lines

  lines.forEach((line) => {
    const [name, department] = line.split(',');
    if (name && department) {
      if (department.trim() === 'CS') {
        students.CS.push(name.trim());
      } else if (department.trim() === 'SWE') {
        students.SWE.push(name.trim());
      }
    }
  });

  return students;
};

// Endpoint for /
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Endpoint for /students
app.get('/students', async (req, res) => {
  try {
    const { database } = req.query;
    const data = await readFileAsync(database);
    const students = parseCSV(data);
    const output = `This is the list of our students\nNumber of students: ${students.CS.length + students.SWE.length}\nNumber of students in CS: ${students.CS.length}. List: ${students.CS.join(', ')}\nNumber of students in SWE: ${students.SWE.length}. List: ${students.SWE.join(', ')}`;
    res.send(output);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Start server

module.exports = app;

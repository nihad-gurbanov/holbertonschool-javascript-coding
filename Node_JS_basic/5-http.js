/* eslint-disable */

const http = require("http");
const fs = require("fs");

const port = 1245;

const countStudents = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const students = {};
        const fields = {};
        let numStudents = 0;
        const lines = data.trim().split('\n');
        for (let i = 1; i < lines.length; i++) {
          if (lines[i]) {
            numStudents++;
            const [firstName, lastName, email, field] = lines[i].split(',');
            if (!students[field]) {
              students[field] = [];
            }
            students[field].push(firstName);
            if (!fields[field]) {
              fields[field] = 0;
            }
            fields[field]++;
          }
        }
        let output = `This is the list of our students\nNumber of students: ${numStudents}\n`;
        for (const [field, count] of Object.entries(fields)) {
          output += `Number of students in ${field}: ${count}. List: ${students[field].join(', ')}\n`;
        }
        resolve(output.trim());
      }
    });
  });
};

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    countStudents(process.argv[2])
      .then((output) => {
        res.end(output);
      })
      .catch((err) => {
        res.statusCode = 500;
        res.end('Error: Cannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
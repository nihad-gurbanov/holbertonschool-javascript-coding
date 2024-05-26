const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    const database = process.argv[2];
    if (!database) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error: No database provided\n');
      return;
    }
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error reading file: ${err.message}\n`);
        return;
      }
      const students = data.trim().split('\n').filter((line) => line.trim() !== '');
      const studentsInCS = students.filter((student) => student.endsWith('CS')).map((student) => student.split(',')[0]);
      const studentsInSWE = students.filter((student) => student.endsWith('SWE')).map((student) => student.split(',')[0]);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('This is the list of our students\n');
      res.write(`Number of students: ${students.length}\n`);
      res.write(`Number of students in CS: ${studentsInCS.length}. List: ${studentsInCS.join(', ')}\n`);
      res.end(`Number of students in SWE: ${studentsInSWE.length}. List: ${studentsInSWE.join(', ')}\n`);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;

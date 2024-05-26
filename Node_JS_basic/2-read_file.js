const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.trim().split('\n');

    // Check if file is not empty
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }

    const headers = lines[0].split(',');
    const students = lines.slice(1).map((line) => line.split(',')).filter((line) => line.length === headers.length);

    const numberOfStudents = students.length;
    console.log(`Number of students: ${numberOfStudents}`);

    const fields = {};

    for (const student of students) {
      const field = student[3];
      const firstname = student[0];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstname);
    }

    for (const [field, firstnames] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

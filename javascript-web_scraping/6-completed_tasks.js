#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  try {
    const data = JSON.parse(body);
    const completedTasks = {};

    data.forEach(task => {
      if (task.completed) {
        if (!completedTasks[task.userId]) {
          completedTasks[task.userId] = 0;
        }
        completedTasks[task.userId]++;
      }
    });

    console.log(completedTasks);
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
});

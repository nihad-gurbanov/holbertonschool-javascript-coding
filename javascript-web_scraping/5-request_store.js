#!/usr/bin/node

const url = process.argv[2];
const filePath = process.argv[3];

const request = require('request');
const fs = require('fs');

request.get(url, (err, response, body) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFile(filePath, response.body, 'utf-8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

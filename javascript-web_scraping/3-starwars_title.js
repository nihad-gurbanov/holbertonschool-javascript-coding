#!/usr/bin/node

const request = require('request');

const root = "https://swapi-api.hbtn.io/api/films/";
const movieId = process.argv[2];
const url = `${root}${movieId}`;

request.get(url, (err, response, body) => {
  if (err) {
    console.error("Error: ", err)
  } else {
    const data = JSON.parse(body);
    console.log(data.title)
  }
})

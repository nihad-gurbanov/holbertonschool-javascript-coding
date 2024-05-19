#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request.get(url, (err, response, body) => {
  if (err) {
    console.error('Error: ', err);
  } else {
    const filmsData = JSON.parse(body);
    const films = filmsData.results;
    let count = 0;

    films.forEach(film => {
      film.characters.forEach(character => {
        if (character.includes('/18/')) {
          count++;
        }
      });
    });

    console.log(count);
  }
});

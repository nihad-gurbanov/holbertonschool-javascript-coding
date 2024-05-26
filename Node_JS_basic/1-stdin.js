const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to Holberton School, what is your name?');

rl.on('line', (input) => {
  const cleanedInput = input.trim();

  console.log(`Your name is: ${cleanedInput}`);
  rl.close();
});

rl.on('close', () => {
  console.log('This important software is now closing');
});

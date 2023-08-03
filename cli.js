import * as readline from 'readline';

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

cli.question('Who are you?\n', name => {
  console.log(`Hey there ${name}!`);
  cli.close();
});

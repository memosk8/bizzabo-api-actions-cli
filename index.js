import * as readline from 'readline';
import readFile from "./readFile.js"
import updateReg from './updateReg.js';

/* Timer helper to wait in the terminal */
const timer = ms => new Promise(res => setTimeout(res, ms));

let responses;

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* main menu */

console.log(" 1 Bulk Update Registrations")
console.log(" 2 Bulk Update Contacts")
console.log(" 0 exit")

cli.question('Select an option:  ', opt => {
  switch (opt) {
    case '0':
      console.log("\nExiting...\n");
      timer(1000).then(() => {
        console.log("done"); cli.close()
      });
      break;

    case '1':
      cli.question("File path: ", (path) => {
        cli.question("API Token: ", (tk) => {
          updateReg(readFile(path), tk)
          cli.close()
        })
      })
      break;

    case '2':
      console.log('Working on it ...')
      cli.close()
      break;

    default:
      console.log("Please choose a valid option...")
      cli.close()
      break;
  }
});
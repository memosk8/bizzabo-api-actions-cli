import * as readline from 'readline';
import readFile from "./readFile.js"
import updateReg from './UpdateReg.js';

// const timer = ms => new Promise(res => setTimeout(res, ms));
// timer().then(_ => {console.log("done"); cli.close()});

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(" 1 Bulk Update Registrations")
console.log(" 2 Bulk Update Contacts")
console.log(" 0 exit")

cli.question('Select an option: \t', opt => {
  switch (opt) {
    case '0':
      console.clear();
      console.log("Exiting...");
      cli.close();
      break;

    case '1':
      cli.question("File path: ", (path) => {
        updateReg(readFile(path))
        cli.close()
      })
      break;
      

    default:
      break;
  }

}); 

import * as readline from 'readline'
import readFile from "./readFile.js"
import updateReg from './UpdateReg.js'
import uploadContacts from './UploadContacts.js'

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

/* main menu */

console.log(" 1 Bulk Update Registrations")
console.log(" 2 Bulk Upload Contacts")
console.log(" 0 exit")

cli.question('Select an option:  ', opt => {
  switch (opt) {
    case '0':
      console.log("\nExiting...\n")
      timer(1000).then(() => {
        console.log("done"); cli.close()
      });
      break

    case '1':
      cli.question("File path: ", (path) => {
        cli.question("API Token: ", (tk) => {
          updateReg(readFile(path), tk)
          cli.close()
        })
      })
      break

    case '2':
      cli.question("File path: ", (path) => {
        cli.question("API Token: ", (tk) => {
          cli.question("Event ID: ", (eventID) => {
            uploadContacts(readFile(path), tk, eventID)
            cli.close()
          })
        })
      })
      break

    default:
      console.log("Please choose a valid option...")
      cli.close()
      break
  }
});

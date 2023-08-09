import readFile from "./readFile.js"
import updateReg from './UpdateReg.js'
import uploadContacts from './UploadContacts.js'
import PromptSync from 'prompt-sync'

const prompt = PromptSync({ sigint: true })
let opt = ''

/* main menu */

console.log(" 1 Bulk Update Registrations")
console.log(" 2 Bulk Upload Contacts")
console.log(" 0 exit")

opt = prompt('Select and option:  ')

do {

  switch (opt) {

    case '0':
      console.log("\nExiting...\n")
      process.exit(1)

    case '1':
      const path = prompt('File path: ')
      const tk = prompt('API token: ')
      const registrations = readFile(path)
      await updateReg(registrations, tk)
      console.log('Bulk Update Registrations complete')
      process.exit(1)

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
      console.log('< Please select a valid option >')
      process.exit(1)
  };

} while (opt != '0');


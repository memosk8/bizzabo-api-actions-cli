import readFile from "./readFile.js"
import updateReg from './UpdateReg.js'
import uploadContacts from './UploadContacts.js'
import PromptSync from 'prompt-sync'
import chalk from "chalk"

const prompt = PromptSync({ sigint: true })
let opt = ''

/* main menu */

do {
  console.clear()
  console.log(chalk.yellow('1 - '), chalk.yellow.bgBlack.italic("Bulk Update Registrations"))
  console.log(chalk.yellow('2 - '), chalk.yellow.bgBlack.italic("Bulk Upload Contacts"))
  console.log(chalk.yellow('0 - '), chalk.redBright.bgBlack.italic("Exit\n"))

  opt = prompt(chalk.green.bgBlack('Select and option: '))

  switch (opt) {

    case '0':
      console.log(chalk.redBright("\nExiting...\n"))
      process.exit(1)

    case '1':
      console.clear()
      console.log(chalk.yellow.bold.bgBlack('\tBulk Update Registration\n'))
      var path = prompt(chalk.green('File path: '))
      var tk = prompt(chalk.green('API token: '))
      var registrations = readFile(path)
      var ok = await updateReg(registrations, tk)
      if(!ok) {
        console.error(chalk.red.bgBlack('An error ocurred, please check your input'))
        process.exit(1)
      }
      console.log(chalk.green('\n============='))
      console.log(chalk.blue.bold('Bulk Update Registrations complete'))
      console.log(chalk.green('=============\n'))
      process.exit(1)

    case '2':
      var path = prompt('File path: ')
      var tk = prompt('API token: ')
      var eventID = prompt('Event #ID: ')
      var contacts = readFile(path)
      await uploadContacts(contacts, tk, eventID)
      console.log('\n==============\n Bulk Upload Contacts complete \n==============\n')
      process.exit(1)

    default:
      break
  };

} while (opt != '0');


import readFile from "./readFile.js"
import updateReg from './UpdateReg.js'
import uploadContacts from './UploadContacts.js'
import PromptSync from 'prompt-sync'
import chalk from "chalk"
import sleep from "./sleep.js"

const prompt = PromptSync({ sigint: true })

/* main menu */

let opt = ''
do {
  console.clear()
  console.log(chalk.green('1 - '), chalk.yellow("Bulk Update Registrations"))
  console.log(chalk.green('2 - '), chalk.yellow("Bulk Upload Contacts"))
  console.log(chalk.green('0 - '), chalk.redBright("Exit\n"))

  opt = prompt(chalk.greenBright('Select an option: '))

  switch (opt) {

    case '0':
      console.log(chalk.redBright("\nExiting...\n"))
      process.exit(1)

    case '1':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Update Registration\n'))
        var registrations
        var path = prompt(chalk.green('File path: '))
        try {
          registrations = readFile(path)
        } catch (error) {
          console.error(chalk.bgBlack.red.bold('\n Could not find the file, please check the path', '\n'))
          console.error(error)
          await sleep(2000)
        }
      } while (!registrations);

      var isUpdated
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Update Registration\n'))
        console.log('File path: ' + path)
        var tk = prompt(chalk.green('API token: '))
        console.log()
        isUpdated = await updateReg(registrations, tk)
      } while (isUpdated === 'BAD_TOKEN')

      await sleep(300)
      console.log(chalk.green('\n======================================'))
      console.log(
        chalk.green('|'),
        chalk.rgb(250, 100, 5).bold('Bulk Update Registrations complete'),
        chalk.green('|')
      )
      console.log(chalk.green('======================================\n'))
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
      console.log('\n', chalk.bgRed.black("invalid option"))
      await sleep(2000)
      break
  };

} while (opt != '0');


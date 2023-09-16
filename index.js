import readFile from "./readFile.js"
import BulkEventCheckin from './Registrations/BulkEventCheckin.js'
import uploadContacts from './UploadContacts.js'
import PromptSync from 'prompt-sync'
import chalk from "chalk"
import sleep from "./sleep.js"
import BulkCancelTickets from "./Registrations/BulkCancelTickets.js"
import BulkAddRegistrations from "./Registrations/BulkAddRegistration.js"
import GetMagicLinks from "./Registrations/GetMagicLinks.js"
import xlsx from "xlsx"
import fs from "fs"

const prompt = PromptSync({ sigint: true })

/* main menu */

let opt = ''
do {
  console.clear()
  console.log(chalk.green('1 - '), chalk.yellow("Bulk Event Checkin"))
  console.log(chalk.green('2 - '), chalk.yellow("Bulk Upload Contacts"))
  console.log(chalk.green('3 - '), chalk.yellow("Get magic links"))
  console.log(chalk.green('4 - '), chalk.yellow("Bulk Cancel Tickets"))
  console.log(chalk.green('5 - '), chalk.yellow("Bulk Add Registrations"))

  console.log(chalk.green('0 - '), chalk.redBright("Exit\n"))

  opt = prompt(chalk.greenBright('Select an option: '))

  switch (opt) {

    case '0':
      console.log(chalk.redBright("\nExiting...\n"))
      process.exit(1)

    /* ------------------------------------------------------- */

    case '1':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Event Checkin\n'))
        var registrations
        var path = prompt(chalk.green('File path: '))
        try {
          registrations = readFile(path)
        } catch (error) {
          console.error(chalk.bgBlack.red.bold('\n Could not find the file, please check the path', '\n'))
          await sleep(1700)
          console.clear()
        }
      } while (!registrations);

      var isUpdated
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Event Checkin\n'))
        console.log('File path: ' + path)
        var tk = prompt(chalk.green('API token: '))
        console.log()
        isUpdated = await BulkEventCheckin(registrations, tk)
        if (isUpdated === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        await sleep(1000)
      } while (isUpdated === 'BAD_TOKEN')

      await sleep(300)
      console.log(chalk.green('\n======================================'))
      console.log(
        chalk.green('|'),
        chalk.rgb(250, 100, 5).bold('Bulk Event Checkin complete'),
        chalk.green('|')
      )
      console.log(chalk.green('======================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */

    case '2':
      var path = prompt('File path: ')
      var tk = prompt('API token: ')
      var eventID = prompt('Event #ID: ')
      var contacts = readFile(path)
      await uploadContacts(contacts, tk, eventID)
      console.log('\n==============\n Bulk Upload Contacts complete \n==============\n')
      process.exit(1)

    /* ------------------------------------------------------- */

    case '3':
      var magicLinks
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nGet magic links\n'))
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        magicLinks = await GetMagicLinks(tk, eventId)
        if (magicLinks.hasOwnProperty('error')) {
          console.error(chalk.bgBlack.red.bold(`\n${magicLinks.message}`))
          await sleep(1200)
        }
        else continue
      } while (magicLinks.error === 'BAD_TOKEN' || magicLinks.error === 'NOT_FOUND' )

      //create folder for generated spreadsheets
      const folderName = `${process.cwd()}/Spreadsheets`
      try {
        if (!fs.existsSync(folderName)) fs.mkdirSync(folderName)
      } catch (err) { console.error(err) }

      // write registrations to spreadsheet
      let workbook = xlsx.utils.book_new()
      const worksheet = xlsx.utils.json_to_sheet(magicLinks)
      xlsx.utils.book_append_sheet(workbook, worksheet, "magic links")
      xlsx.writeFile(workbook, `${process.cwd()}/Spreadsheets/Magic_Links.xlsx`)

      console.log(chalk.green('================================='))
      console.log(
        chalk.rgb(250, 100, 5).bold('Magic links saved to spreadsheet:'),
        chalk.underline.greenBright(`${process.cwd()}/Spreadsheets/Magic_Links.xlsx`))
      console.log(chalk.green('=================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */

    case '4':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Cancel Tickets\n'))
        var registrations
        var path = prompt(chalk.green('File path: '))
        try {
          registrations = readFile(path)
        } catch (error) {
          console.error(chalk.bgBlack.red.bold('\n Could not find the file, please check the path', '\n'))
          await sleep(2000)
        }
      } while (!registrations);

      var isUpdated
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Cancel Tickets\n'))
        console.log('File path: ' + path)
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        console.log()
        isUpdated = await BulkCancelTickets(eventId, registrations, tk)
        if (isUpdated === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        await sleep(1000)
      } while (isUpdated === 'BAD_TOKEN')

      await sleep(300)
      console.log(chalk.green('\n======================================'))
      console.log(
        chalk.green('|'),
        chalk.rgb(250, 100, 5).bold('Bulk Cancel Tickets complete'),
        chalk.green('|')
      )
      console.log(chalk.green('======================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */

    case '5':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Add Registrations\n'))
        var registrations
        var path = prompt(chalk.green('File path: '))
        try {
          registrations = readFile(path)
        } catch (error) {
          console.error(chalk.bgBlack.red.bold('\n Could not find the file, please check the path', '\n'))
          await sleep(2000)
        }
      } while (!registrations);

      var isUpdated
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Add Registrations\n'))
        console.log('File path: ' + path)
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        var ticketId = prompt(chalk.green('Ticket type ID: #'))
        console.log()
        isUpdated = await BulkAddRegistrations(registrations, tk, eventId, ticketId)
        if (isUpdated === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        await sleep(1000)
      } while (isUpdated === 'BAD_TOKEN')

      await sleep(300)
      console.log(chalk.green('\n======================================'))
      console.log(
        chalk.green('|'),
        chalk.rgb(250, 100, 5).bold('Bulk Add Registrations complete'),
        chalk.green('|')
      )
      console.log(chalk.green('======================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */

    default:
      console.log('\n', chalk.bgRed.black("invalid option"))
      await sleep(2000)
      break

  };

} while (opt != '0');

/* Functions menus */

async function bulkEventCheckinMenu() {

}
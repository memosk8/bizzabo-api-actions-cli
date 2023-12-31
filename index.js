import BulkAddRegistrations from "./Registrations/BulkAddRegistration.js"
import BulkCancelTickets from "./Registrations/BulkCancelTickets.js"
import BulkEventCheckin from './Registrations/BulkEventCheckin.js'
import GetTicketHolders from "./Registrations/GetTicketHolders.js"
import BulkSessionCheckin from "./Sessions/BulkSessionCheckin.js"
import GetMagicLinks from "./Registrations/GetMagicLinks.js"
import ListRegTypes from "./Registrations/ListRegTypes.js"
import GetAllEvents from "./Events/GetAllEvents.js"
import uploadContacts from './UploadContacts.js'
import PromptSync from 'prompt-sync'
import readFile from "./readFile.js"
import sleep from "./sleep.js"
import chalk from "chalk"
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
  console.log(chalk.green('6 - '), chalk.yellow("List event registration types"))
  console.log(chalk.green('7 - '), chalk.yellow("Get all active ticket holders"))
  console.log(chalk.green('8 - '), chalk.yellow("Get all account events"))
  console.log(chalk.green('9 - '), chalk.yellow("Bulk session checkin"))
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
      } while (magicLinks.error === 'BAD_TOKEN' || magicLinks.error === 'NOT_FOUND')

      //create folder for generated spreadsheets
      var folderName = `${process.cwd()}/Spreadsheets`
      try {
        if (!fs.existsSync(folderName)) fs.mkdirSync(folderName)
      } catch (err) { console.error(err) }

      // write registrations to spreadsheet
      var workbook = xlsx.utils.book_new()
      var worksheet = xlsx.utils.json_to_sheet(magicLinks)
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
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        var ticketId = prompt(chalk.green('Ticket type ID: #'))
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
        console.log()
        isUpdated = await BulkAddRegistrations(registrations, tk, eventId, ticketId)
        if (isUpdated === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        if (isUpdated === 'NOT_FOUND') {
          console.error(chalk.bgBlack.red.bold('\nCheck your event ID or ticket ID'))
        }
        await sleep(1000)
      } while (isUpdated === 'BAD_TOKEN' || isUpdated === 'NOT_FOUND' || isUpdated == false)

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

    case '6':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nList Event Ticket Types\n'))
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        var regTypes = await ListRegTypes(tk, eventId)
        if (regTypes.status == false) { console.error(regTypes.message) }
        await sleep(1500)
      } while (regTypes.status == false)

      var wb = xlsx.utils.book_new()
      var ws = xlsx.utils.json_to_sheet(regTypes.types)
      xlsx.utils.book_append_sheet(wb, ws, "Ticket Types")
      xlsx.writeFile(wb, `Ticket_types.xlsx`)

      console.log(chalk.green('================================='))
      console.log(regTypes.types)
      console.log(chalk.green('=================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */

    case '7':
      var ticketHolders
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nGet magic links\n'))
        var eventId = prompt(chalk.green('Event ID: '))
        var tk = prompt(chalk.green('API token: '))
        ticketHolders = await GetTicketHolders(tk, eventId)
        if (ticketHolders.hasOwnProperty('error')) {
          console.error(chalk.bgBlack.red.bold(`\n${ticketHolders.message}`))
          await sleep(1200)
        }
        else continue
      } while (ticketHolders.error === 'BAD_TOKEN' || ticketHolders.error === 'NOT_FOUND')

      // write registrations to spreadsheet
      var workbook = xlsx.utils.book_new()
      var worksheet = xlsx.utils.json_to_sheet(ticketHolders)
      xlsx.utils.book_append_sheet(workbook, worksheet, "magic links")
      xlsx.writeFile(workbook, `Ticket_holders.xlsx`)

      console.log(chalk.green('================================='))
      console.log(
        chalk.rgb(250, 100, 5).bold('Ticket holders saved to spreadsheet:'),
        chalk.underline.greenBright(`${process.cwd()}/Magic_Links.xlsx`))
      console.log(chalk.green('=================================\n'))
      process.exit(1)

    /* ------------------------------------------------------- */      

    case '8':
      var events
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nGet all account events!\n'))
        var tk = prompt(chalk.green('API token: '))
        console.log()
        events = await GetAllEvents(tk)
        if (events === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        await sleep(1000)
      } while (events === 'BAD_TOKEN')

      // write registrations to spreadsheet
      var workbook = xlsx.utils.book_new()
      var worksheet = xlsx.utils.json_to_sheet(events.events)
      xlsx.utils.book_append_sheet(workbook, worksheet, "All Events")
      xlsx.writeFile(workbook, `${process.cwd()}/All_Events.xlsx`)

      await sleep(300)
      console.log(events)
      process.exit(1)

    /* ------------------------------------------------------- */      

    case '9':
      do {
        console.clear()
        console.log(chalk.yellow.bold('\nBulk Session Checkin\n'))
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
        console.log(chalk.yellow.bold('\nBulk Session Checkin\n'))
        console.log('File path: ' + path)
        var tk = prompt(chalk.green('API token: '))
        var eventID = prompt(chalk.green('Event ID: '))
        var sessionID = prompt(chalk.green('Session ID: '))
        console.log()
        isUpdated = await BulkSessionCheckin(registrations, tk, eventID, sessionID)
        if (isUpdated === 'BAD_TOKEN') {
          console.error(chalk.bgBlack.red.bold('\nInvalid token'))
        }
        await sleep(1000)
      } while (isUpdated === 'BAD_TOKEN' || isUpdated === 'BAD_REQUEST' || isUpdated === 'NOT_FOUND')

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

    default:
      console.log('\n', chalk.bgRed.black("invalid option"))
      await sleep(2000)
      break

  };

} while (opt != '0');


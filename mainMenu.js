import chalk from "chalk"

/**
 * 
 * @returns {string}
 * The user input that represents the option to select
 * 
 */

function mainMenu(prompt) {
  var opt
  console.clear()
  console.log(chalk.green('0  - '), chalk.redBright("Exit"))
  console.log(chalk.green('1  - '), chalk.yellow("Bulk Event Checkin"))
  console.log(chalk.green('2  - '), chalk.yellow("Bulk Upload Contacts"))
  console.log(chalk.green('3  - '), chalk.yellow("Get magic links"))
  console.log(chalk.green('4  - '), chalk.yellow("Bulk Cancel Tickets"))
  console.log(chalk.green('5  - '), chalk.yellow("Bulk Add Registrations"))
  console.log(chalk.green('6  - '), chalk.yellow("List event registration types"))
  console.log(chalk.green('7  - '), chalk.yellow("Get all active ticket holders"))
  console.log(chalk.green('8  - '), chalk.yellow("Get all account events"))
  console.log(chalk.green('9  - '), chalk.yellow("Bulk session checkin"))
  console.log(chalk.green('10 - '), chalk.yellow("List all contacts"))
  console.log(chalk.green('11 - '), chalk.yellow("Update contacts from xlsx file"))
  console.log()
  opt = prompt(chalk.greenBright('Select an option: '))
  return opt
}

export default mainMenu
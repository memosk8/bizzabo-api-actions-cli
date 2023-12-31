import fetch from "node-fetch"
import chalk from "chalk";

/**
 * 
 * @param {Array<Object>} registrations 
 * The registrations array of objects
 * 
 * @param {String} token 
 * The API token for the account
 * 
 * @description
 * Creates registration for the specified contact (first name, last name, email) and 
 * with the specified ticket type (ticketId)
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid - Error 401
 *  or true if ok
 */

export default async function BulkAddRegistrations(registrations, token, eventId, ticketId) {

  for (let i = 0; i < registrations.length; i++) {

    const reg = registrations[i];
    const url = `https://api.bizzabo.com/api/registrations/${reg["Ticket Number"]}?eventId=${eventId}`

    const options = {
      'method': 'POST',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },

      'body': JSON.stringify({
        'properties': {
          'firstName': reg['First Name'],
          'lastName': reg['Last Name'],
          'email': reg['Email Address'],
        },
        'ticketId': ticketId,
        'paymentMethod': reg['Payment Method'],
      }),
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 401) {
        return 'BAD_TOKEN'
      }
      else if (res.status === 404) {
        return 'NOT_FOUND'
      }
      else if (res.status === 200) {
        const body = await res.json()
        console.log(i, chalk.green.bold(res.status), chalk.cyan(res.url),
          chalk.greenBright(body.modified.split('T')[0]) +
          chalk.red('T') +
          chalk.yellow(body.modified.split('T')[1])
        )
        console.log(body.checkedin)
      }
      else return false
    }
    catch (error) {
      console.error(error)
    }
  }
  return true
}

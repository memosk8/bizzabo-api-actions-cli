import fetch from "node-fetch"
//import sleep from "./sleep.js"
import chalk from "chalk";

/**
 * @param {String} eventId 
 * The event ID #
 * 
 * @param {Array<Object>} registrations 
 * The registrations array of objects
 * 
 * @param {String} token 
 * The API token for the account
 * 
 * @description
 * Creates the URL to call based upon each ticket number, generates
 * the headers and body of the request, and makes the call to the API.
 * Logs the endpoints, status and 
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid - Error 401
 *  or true if ok
 */

export default async function BulkCancelTickets(eventId, registrations, token) {

  for (let i = 0; i < registrations.length; i++) {

    const reg = registrations[i];
    const url = `https://api.bizzabo.com/api/registrations/cancel?eventId=${eventId}&orderId=${reg['Order Number']}&ticketId=${reg['Ticket Number']}&validity=invalid&refundAmount=${0}&sendEmail=false`
    
    const options = {
      'method': 'PUT',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 401) {
        return 'BAD_TOKEN'
      }
      console.log(chalk.yellow(res.status))
      console.log(chalk.red(`Canceled Ticket #${reg['Ticket Number']}`))
    }
    catch (error) {
      console.error(error)
    }
  }
  return true;
}

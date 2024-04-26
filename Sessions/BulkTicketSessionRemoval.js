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
 * @param {String} eventId 
 * The event ID number 
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid - Error 401
 *  or true if ok
 */

export default async function BulkTicketSessionRemoval(tickets, token, eventId, sessionId) {

  for (let i = 0; i < tickets.length; i++) {

    const ticket = tickets[i];
    const url = `https://api.bizzabo.com/v1/events/${eventId}/agenda/sessions/${sessionId}/registrations/${ticket['Ticket Number']}`

    const options = {
      'method': 'DELETE',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      }
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 200) {
        console.log(res.status, chalk.bgBlue('Ticket'), chalk.rgb(255,165,0).underline(`${ticket['Ticket Number']}`), chalk.bgBlue(`removed from session #${sessionId}`))
      }
      if (res.status === 401) {
        return 'BAD_TOKEN'
      }
      if (res.status === 404) {
        return 'NOT_FOUND'
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  return true;
}
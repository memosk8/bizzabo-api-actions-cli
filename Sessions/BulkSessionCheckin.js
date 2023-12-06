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

export default async function BulkSessionCheckin(registrations, token, eventID, sessionID) {

  for (let i = 0; i < registrations.length; i++) {

    const reg = registrations[i];
    const url = `https://api.bizzabo.com/api/registrations/${reg['Ticket Number']}/checkIn?eventId=${eventID}`
    
    const options = {
      'method': 'PUT',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },

      /*  body has to be stringified, if not 
          the api will return an internal error 500  */

      'body': JSON.stringify({
        'sessionId': sessionID,
        'checkedIn': true,
      }),
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 401) {
        return 'BAD_TOKEN'
      }
      if (res.status === 404) {
        return 'NOT_FOUND'
      }
      
      const body = await res.json()
      console.log(i, chalk.green.bold(res.status), chalk.cyan(res.url), body.checkedin/* ,
        chalk.greenBright(body.modified.split('T')[0]) +
        chalk.red('T') +
        chalk.yellow(body.modified.split('T')[1]) */
      )
    }
    catch (error) {
      console.error(error)
    }
  }
  return true;
}
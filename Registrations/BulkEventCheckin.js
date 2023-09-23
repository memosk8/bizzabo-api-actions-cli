import fetch from "node-fetch"
//import sleep from "./sleep.js"
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
 * Creates the URL to call based upon each ticket number, generates
 * the headers and body of the request, and makes the call to the API.
 * Logs the endpoints, status and   
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid - Error 401
 *  or true if ok
 */

export default async function BulkEventCheckin(registrations, token) {

  for (let i = 0; i < registrations.length; i++) {

    const reg = registrations[i];
    const url = `https://api.bizzabo.com/api/registrations/${reg["Ticket Number"]}?checkTicketRules=false`
    
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
        'properties': {
          'firstName': reg['First Name'],
          'lastName': reg['Last Name'],
          'email': reg['Email Address'],
        },
        'checkedin': true,
      }),
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 401) {
        return 'BAD_TOKEN'
      }
      if (res.status === 404) {
        return 'BAD_REQUEST'
      }
      const body = await res.json()
      console.log(i, chalk.green.bold(res.status), chalk.cyan(res.url),
        chalk.greenBright(body.modified.split('T')[0]) +
        chalk.red('T') +
        chalk.yellow(body.modified.split('T')[1])
      )
      console.log(body.checkedin)
    }
    catch (error) {
      console.error(error)
    }
  }
  return true;
}
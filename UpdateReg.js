import fetch from "node-fetch"
import sleep from "./sleep.js"
import chalk from "chalk";

/**
 * 
 * @param {Array<Object>} registrations 
 * The registrations array of objects
 * 
 * @description
 * Creates the URL to call based upon each ticket number, generates
 * the headers and body of the request, and makes the call to the API.
 * Logs the endpoints, status and   
 * 
 */

export default async function updateReg(registrations, token) {

  for (let i = 0; i < registrations.length; i++) {

    const reg = registrations[i];
    const url = `https://api.bizzabo.com/api/registrations/${reg["Ticket Number"]}`
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
        }
      }),

      'checkedIn': reg["Event Checked In"],
    }

    try {
      const res = await fetch(url, options)
      if (res.status === 401) {
        console.log(chalk.red.bgBlack('<- Please check your API token ->\n'))
        process.exit(1)
      }
      const body = await res.json()
      console.log(
        chalk.bgGray.bold.yellow(res.status),
        chalk.cyan(res.url),
        chalk.green(body.modified.split('T')[0]), chalk.red('T'), chalk.yellow(body.modified.split('T')[1])
      )
    }
    catch (error) {
      console.error(error.status)
    }

    /* to avoid the API call limit per second  */
    sleep(100)
  }
}

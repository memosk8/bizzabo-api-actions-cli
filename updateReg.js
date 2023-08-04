import fetch from "node-fetch"
import 'dotenv/config.js'

/**
 * 
 * @param {Array<Object>} registrations 
 * The registrations array of objects
 * 
 * @description
 * Creates the URL to call based upon each ticket number, generates
 * the headers and body of the request, and makes the call to the API
 * 
 * @returns
 * An array with the responses of all the API calls
 */

export default async function updateReg(registrations, token) {
  registrations.forEach(async (reg) => {

    const url = `https://api.bizzabo.com/api/registrations/${reg["Ticket Number"]}`

    const options = {
      'method': 'PUT',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify({
        //  body has to be stringified, if not the api will return an internal error 500
        'properties': {
          'firstName': reg['First Name'],
          'lastName': reg['Last Name'],
          'email': reg['Email Address'],
        }
      }),
      'checkedIn': reg["Event Checked In"],
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(reg["Ticket Number"],response.status, data.status, Date(Date.parse(data.modified).toLocaleString()))
    }
    catch (error) {
      console.error(error)
    }
  })
}
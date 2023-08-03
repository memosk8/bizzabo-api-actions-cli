import fetch from "node-fetch"
import registrations from "./readFile.js"
import 'dotenv/config.js'

registrations.forEach(async (reg) => {

  let ticketId = reg["Ticket Number"]
  let url = `https://api.bizzabo.com/api/registrations/${ticketId}`

  const options = {
    'method': 'PUT',
    'headers': {
      'Authorization': process.env.API_TOKEN,
      'Content-Type': 'application/vnd.bizzabo.v2.0+json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({ 
  //  json body has to be stringified, if not the api will return an internal error 500
      'properties': {
        'firstName': reg['First Name'],
        'lastName': reg['Last Name'],
        'email': reg['Email Address'],
        'checkedin': reg['Event Checked In']
      }
    }),
    'checkedIn': reg["Event Checked In"],
  }

  console.log(JSON.stringify(options))

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error);
  }

});


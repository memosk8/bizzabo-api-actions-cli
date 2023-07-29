import fetch from "node-fetch"
import token from "./getAuth.js";
import registrations from "./readFile.js"

registrations.forEach(async (reg) => {

  let ticketId = reg["Ticket Number"]
  let url = `https://api.bizzabo.com/api/registrations/${ticketId}?checkTicketRules=true`;

  const options = {
    method: 'PUT',
    // url: `https://api.bizzabo.com/api/registrations/${ticketId}`,
    headers: {
      Authorization: `Bearer e993eebd-f4d6-4b7b-9a77-cb4be83fd1d2`,
      'Content-Type': 'application/vnd.bizzabo.v2.0+json',
      Accept: 'application/json'
    },
    body: {
      properties: {
        firstName: reg["First Name"],
        lastName: reg["Last Name"],
        email: reg["Email Address"],
        company: reg["Company"]
      },
      checkedIn: reg["Event Checked In"] === "false" ? false : true,
    }
  };

  try {
    const response = await fetch(url, options);
  } catch (error) {
    console.error(error);
  }

})


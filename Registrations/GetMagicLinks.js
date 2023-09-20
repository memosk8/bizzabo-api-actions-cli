import fetch from "node-fetch"

/**
 * 
 * @description
 * Get all registranst magic links into a spreadsheet 
 * 
 * @param {String} token 
 * The API token 
 * 
 * @param {String} eventId 
 * The event ID to get registrations
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid (Error 401)
 *  or true if ok
 */

export default async function GetMagicLinks(token, eventId) {

  const url = `https://api.bizzabo.com/api/registrations?eventId=${eventId.trim()}`
  const options = {
    'method': 'GET',
    'headers': {
      'Authorization': `Bearer ${token.trim()}`,
      'Content-Type': 'application/vnd.bizzabo.v2.0+json',
      'Accept': 'application/json'
    }
  }

  try {
    const res = await fetch(url, options)

    if (res.status === 404) return { 
      status: false, 
      error: "NOT_FOUND", 
      message: "Please check the event # ID " 
    }
    else if (res.status === 401) return { 
      status: false, 
      error: 'BAD_TOKEN', 
      message: "Please check your API token" 
    }
    else if(res.status === 200){
      let magicLinks = []
      const body = await res.json()

      for (let i = 0; i < body.content.length; i++) {
        const registration = body.content[i];

        magicLinks.push({
          'First Name': registration.properties.firstName,
          'Last Name': registration.properties.lastName,
          'Email': registration.properties.email,
          'Valitidy': registration.validity,
          'Ticket Number': registration.id,
          'Ticket Name': registration.ticketName,
          'Magic Link': registration.magicLink
        })
      }
      return magicLinks;
    }
  }
  catch (error) {
    console.error(error)
  }
}
import fetch from "node-fetch"

/**
 * 
 * @description
 * Creates a new array of objects for all the tickets assigned to each email except 
 * for the first ticket assigned
 * 
 * @param {String} token 
 * The API token 
 * 
 * @param {String} eventId 
 * The event ID to get registrations
 * 
 * @param {Array[Object]} contacts 
 * List of emails
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid (Error 401)
 *  or true if ok
 */

export default async function FilterRegsByEmail(token, eventId, contacts) {

  const tickets = []

  for (let i = 0; i < contacts.length; i++) {
    console.log(i)
    const contact = contacts[i];

    const url = `https://api.bizzabo.com/api/registrations?eventId=${eventId.trim()}&filter=properties.email%3D${contact['Email Address']}&sort=created%2Cdesc&size=200`
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
      else if (res.status === 200) {
        const body = await res.json()
        try {
          for (let i = 0; i < body.content.length - 1; i++) {
            const ticket = body.content[i];
            if (ticket.validity === 'valid') {
              tickets.push({
                'Order Number': ticket.orderId,
                'Ticket Number': ticket.id
              })
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  console.log(tickets)
  return tickets
}

/*
const tickets = await FilterRegsByEmail(
  '935d4cf1-dd55-4e83-86f6-84778f90c12d',
  '573891',
  [
    { 'Email Address': 'kyra.sheehan+ig@gmail.com' },
    { 'Email Address': 'kat.finch+cultureamp@propelleraero.com.au' },
    { 'Email Address': 'aslisevinc+newsletter@gmail.com' }
  ]
)

await BulkCancelTickets('573891', tickets, '935d4cf1-dd55-4e83-86f6-84778f90c12d')
*/

/* @TODO:  loop pagination */
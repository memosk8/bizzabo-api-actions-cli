import fetch from "node-fetch"

export default async function uploadContacts(contacts, token, eventID) {

  for (let i = 0; i < contacts.length; i++) {

    const contact = contacts[i];
    const url = `https://api.bizzabo.com/api/contacts/?eventId=${eventID}`
    const options = {

      'method': 'POST',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },

      /*  body has to be stringified, if not 
          the api will return an internal error 500  */

      'body': JSON.stringify({
        'properties': {
          'email': contact['Email Address'],
          'firstName': contact['First Name'],
          'lastName': contact['Last Name'],
          'company': contact['Company'],
          'title': contact['Job Title']
        }
      })
    }

    try {
      const res = await fetch(url, options)
      const body = await res.json()
      console.log(res.status, res.url, body.modified)
    }
    catch (error) {
      console.error(error)
    }
  }
}
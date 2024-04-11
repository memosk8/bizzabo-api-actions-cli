import chalk from "chalk"
import fetch from "node-fetch"

/**
 * 
 * @description
 * Update contacts with custom properties
 * 
 * @param {String} token 
 * The API token 
 * 
 * @param {String} eventId 
 * The event ID to get registrations
 * 
 * @param {Array[Object]} [contacts]
 * This value is optional, but if provided it will be added to the call to filter contact lists
 * 
 * @returns {[Object]} Array of objects that represent 
 * the contacts from the specified event with the provided filters
 */

export default async function UpdateContacts(token, eventId, contacts) {

  contacts.forEach(async (contact, i) => {
    let baseUrl = `https://api.bizzabo.com/api/contacts/${contactId}?eventId=${eventId}`

    const options = {
      'method': 'PUT',
      'headers': {
        'Authorization': `Bearer ${token.trim()}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify({
        "properties": {
          "email": contact['email'],
          "firstName": contact['firstName'],
          "lastName": contact['lastName']
        }
      })
    }

    try {
      const res = await fetch(baseUrl, options)
      if (res.status === 401) return {
        status: false,
        message: "Please check your API token"
      }
      else if (res.status === 200) {
        console.log(chalk.green(`\nContact ${contact[i]}`))
      }
      else return {
        status: false,
        message: "Please check the event ID"
      }
    }
    catch (error) {
      console.error(error)
    }
  })


}

// ListAllContacts('e993eebd-f4d6-4b7b-9a77-cb4be83fd1d2','461236','1874933')0
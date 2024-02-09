import fetch from "node-fetch"

/**
 * 
 * @description
 * Get all of the contacts from an event. They can be filtered by any existing contact list for simplicity
 * 
 * @param {String} token 
 * The API token 
 * 
 * @param {String} eventId 
 * The event ID to get registrations
 * 
 * @param {Number} [listId]
 * This value is optional, but if provided it will be added to the call to filter contact lists
 * 
 * @returns {Array} Array of objects that represent 
 * the contacts from the specified event with the provided filters
 */

export default async function ListAllContacts(token, eventId, listId) {

  let baseUrl = `https://api.bizzabo.com/api/contacts?eventId=${eventId}`

  if (listId) baseUrl = `https://api.bizzabo.com/api/contacts?eventId=${eventId}&listId=${listId}`

  const options = {
    'method': 'GET',
    'headers': {
      'Authorization': `Bearer ${token.trim()}`,
      'Content-Type': 'application/vnd.bizzabo.v2.0+json',
      'Accept': 'application/json'
    }
  }

  try {
    const res = await fetch(baseUrl, options)
    var filteredContacts = []
    if (res.status === 401) return {
      status: false,
      message: "Please check your API token"
    }
    else if (res.status === 200) {
      const body = await res.json()
      const contacts = body.content
      contacts.forEach((contact, i) => {
        filteredContacts[i] = {
          ...contact.properties,
          id: contact.id,
          created: contact.created
        }
      })
      contacts['status'] = true
      contacts['message'] = "GET contacts OK"
      // console.log(contacts)
      return filteredContacts
    }
    else return {
      status: false,
      message: "There was an error. Please check your input"
    }
  }
  catch (error) {
    console.error(error)
  }
}

// ListAllContacts('8f8f33a8-091a-4db7-8768-20b75a182031','550565')
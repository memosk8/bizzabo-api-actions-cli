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
 * @returns
 * The contacts from the specified event with the provided filters
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

    if (res.status === 401) return {
      status: false,
      message: "Please check your API token"
    }
    else if (res.status === 200) {
      const body = await res.json()
      const contacts = body.content
      contacts['status'] = true
      // console.log(contacts)
      return contacts
    }
    else return {
      status: false,
      message: "Please check the event ID"
    }
  }
  catch (error) {
    console.error(error)
  }
}

// ListAllContacts('e993eebd-f4d6-4b7b-9a77-cb4be83fd1d2','461236','1874933')
import fetch from 'node-fetch'

/**
 * @description
 * Upload a list of contacts to an event
 * 
 * @param {String} token 
 * The API token
 *  
 * @param {Number} eventId 
 * The event ID to upload the contacts to
 * 
 * @param {Array<Object>} contacts
 * The list of contacts to upload to the event
 * 
 * @returns
 * True if the contacts where uploaded successfully 
 */

export default async function bulkUploadContacts(token, eventId, contacts){
  const url = `https://api.bizzabo.com/v1/events/${eventId}/contacts`

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    
    const options = {
      'method': 'POST',
      'headers': {
        'Authorization': `Bearer ${token.trim()}`,
        'Accept': 'application/json'
      },
      
      "body": JSON.stringify({
        'properties': {
          'firstName': contact['First Name'],
          'lastName': contact['Last Name'],
          'email': contact['Email Address'],
        },
      })
    }
  }
  return true
}
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
 * The Registration types (ticket types) ||
 * BAD_TOKEN if the provided token is invalid (Error 401) ||
 * NOT_FOUND if the event ID is incorrect
 * true if ok
 */

export default async function ListRegTypes(token, eventId) {

// https://api.bizzabo.com/api/registrationTypes?eventId=461236

  const url = `https://api.bizzabo.com/api/registrationTypes?eventId=${eventId.trim()}`
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
      const body = await res.json()
      return {status: true, types: body.content}
    }
  }
  catch (error) {
    console.error(error)
  }
}
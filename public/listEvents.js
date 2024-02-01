import fetch from "node-fetch"

/**
 * 
 * @description
 * Get all registranst magic links into a spreadsheet 
 * 
 * @param {String} token 
 * The API token 
 * 
 * @returns
 * A list of all of the events in an account ||
 * BAD_TOKEN if the provided token is invalid (Error 401) ||
 */

export default async function listEvents(token) {

  const url = `https://api.bizzabo.com/v1/events`
  const options = {
    'method': 'GET',
    'headers': {
      'Authorization': `Bearer ${token.trim()}`,
      'Accept': 'application/json'
    }
  }

  try {
    const res = await fetch(url, options)

    if (res.status === 401) return "BAD_TOKEN"
    if (res.status === 200) {
      const body = await res.json()
       return body.content
    }
  }
  catch (error) {
    console.error(error)
  }
}
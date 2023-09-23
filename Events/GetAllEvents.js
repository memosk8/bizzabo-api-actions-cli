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

export default async function GetAllEvents(token) {

  const url = `https://api.bizzabo.com/api/events`
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

    if (res.status === 401) return {
      status: false,
      error: 'BAD_TOKEN',
      message: "Please check your API token"
    }
    else if (res.status === 200) {
      const body = await res.json()
      let events = []

      for (let i = 0; i < body.content.length; i++) {
        const event = body.content[i];

        events.push({
          'Name': event.name,
          'Start Date': event.startDate,
          'End Time': event.endDate,
          'Status': event.status,
          'Website Url': event.websiteUrl
        })
      }

      return { status: true, events }
    }
  }
  catch (error) {
    console.error(error)
  }
}
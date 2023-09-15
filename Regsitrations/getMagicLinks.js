import xlsx from "xlsx"
import fetch from "node-fetch"
import sleep from "sleep-promise";
// import chalk from "chalk";
  
/**
 * 
 * @description
 * Get all registranst magic links into a spreadsheet 
 * 
 * @param {String} spreadsheet 
 * The spreadsheet with the registrants info: [firstName, lastName, email, ticketID]
 * 
 * @param {String} token 
 * The API token 
 * 
 * @returns
 * BAD_TOKEN if the provided token is invalid (Error 401)
 *  or true if ok
 */

export default async function GetMagicLinks(token, filePath, eventId) {

  let magicLinks = []

  for (let i = 0; i < regs.length; i++) {

    const url = `https://api.bizzabo.com/api/registrations/?eventId=${eventId}`
    const options = {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/vnd.bizzabo.v2.0+json',
        'Accept': 'application/json'
      }
    }

    try {
      const res = await fetch(url, options)

      if (res.status === 401) return { error: 'BAD_TOKEN', message: "Please check your API token" }
      if (res.status === 400) return { error: "NOT_FOUND", message: "Please check the #event ID " }

      const body = await res.json()

      magicLinks.push({
        'First name': body[properties].firstName,
        'Last name': body[properties].lastName,
        'Email': body[properties].email,
        'Ticket number': body.id,
        'Magic link': body.magicLink
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  console.log(magicLinks)

  const ws = xlsx.utils.json_to_sheet(magicLinks)
  const wb = xlsx.utils.book_new("magic")
  xlsx.utils.book_append_sheet(wb, ws, 'Magic links')
  xlsx.writeFile(wb, filePath)

  return true;

}
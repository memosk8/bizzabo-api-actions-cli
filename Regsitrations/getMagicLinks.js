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

export default async function getMagicLinks(regs, token, path) {

  let magicLinks = []

  for (let i = 0; i < regs.length; i++) {

    const reg = regs[i];
    const url = `https://api.bizzabo.com/api/registrations/${reg["Ticket Number"]}`
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

      if (res.status === 401) {
        return 'BAD_TOKEN'
      }

      const body = await res.json()

      console.log(url, options, res)
      await sleep(1000)

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

    /* to avoid the API call limit per second  */
    // await sleep(100)
  }

  console.log(magicLinks)

  /*   
    const ws = xlsx.utils.json_to_sheet(magicLinks)
    const wb = xlsx.utils.book_new("magic")
    xlsx.utils.book_append_sheet(wb, ws, 'Magic links')
    xlsx.writeFile(wb, path) 
  */

  return true;

}
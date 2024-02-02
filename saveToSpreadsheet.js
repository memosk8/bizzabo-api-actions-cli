/**
 * @description 
 * Saves the data to a spreadsheet, using the name and the event ID in the worksheet and the filepath 
 * to /Spreadsheets folder
 * 
 * @param {Array} data 
 * Array of objects to write to the spreadsheet
 * @param {String} eventId 
 * The event ID to use in the name of the file
 * @param {String} name 
 * The name to be used on the file and the worksheet
 * @returns {true | false} **true** if there are no errors || **false** if otherwise
 */

export default function saveToSpreadsheet(data, eventId, name) {
  try {
    var workbook = xlsx.utils.book_new()
    var worksheet = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(workbook, worksheet, name)
    xlsx.writeFile(workbook, `${process.cwd()}/Spreadsheets/${name}_${eventId}.xlsx`)
    return true
  } catch (error) {
    return error
  }
}
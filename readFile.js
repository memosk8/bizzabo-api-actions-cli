import xlsx from "xlsx";

/***
 * 
 * @param {String} path
 * The path to the spreadsheet file
 * 
 * @description
 * Takes the spreadsheet path, opens the file and 
 * exports all the data to an array of objects, 
 * each one representing a row in the file
 * 
 * @returns {Array<Object>}
 * An array with all the rows in the spreadsheet
 * 
 */

export default function readFile(path) {
  const file = xlsx.readFile(path)
  const sheetToJson = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
  return sheetToJson
}
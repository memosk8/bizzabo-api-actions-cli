import xlsx from "xlsx"

/**
 * @description
 * Write an array of objects to an xlsx spreadsheet file
 */

export default function writeFile(data, worksheetName, fileName) {
  try {
    var workbook = xlsx.utils.book_new()
    var worksheet = xlsx.utils.json_to_sheet(data)
    xlsx.utils.book_append_sheet(workbook, worksheet, worksheetName)
    xlsx.writeFile(workbook, `${fileName}.xlsx`)
    return {
      message: "File written OK",
      status: true
    }
  } catch (error) {
    return {
      message: `${error}`,
      status: false
    }
  }
}

writeFile([
  {
    'Name': "Guillermo",
    'Last Name': "Lopez",
    'Age': 30
  },
  {
    'Name': "Margarita",
    'Last Name': "Robles",
    'Age': 31
  }
], 'Contacts', 'Contacts')
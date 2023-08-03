import xlsx from "xlsx";
import os from 'node:os'

const file = xlsx.readFile(
  os.platform() === 'darwin' ? 
    '/Users/guillermolopez/Downloads/tickets-461236.xlsx' : 
    '/home/memosk8/Descargas/my_tickets.xlsx'
)

var registrations = []

const jsonSheet = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

jsonSheet.forEach((row) => {
  registrations.push(row)
})

console.log(registrations)

export default registrations;
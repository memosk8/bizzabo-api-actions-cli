import xlsx from "xlsx";

const file = xlsx.readFile('/home/memosk8/Descargas/my_tickets.xlsx')

var rows = []

const jsonSheet = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

jsonSheet.forEach((row) => {
  rows.push(row)
})

export default rows;
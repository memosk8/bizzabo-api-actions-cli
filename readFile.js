import xlsx from "xlsx";

function readFile(path) {

  const file = xlsx.readFile(path);

  var registrations = [];

  const jsonSheet = xlsx.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  jsonSheet.forEach((row) => registrations.push(row));

  return registrations;

}

export default readFile;
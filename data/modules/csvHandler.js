const fs = require('fs');
const csv = require('fast-csv');
const csvStringify = require('csv-stringify');


// Esempio di lettura e scrittura CSV
const filePath = './data/data.csv';

// Leggi il CSV
readCSV(filePath, (data) => {
  console.log(data);
});

// Scrivi sul CSV
const dataOut = [
  ["Apple", "Banana"],
  ["Cherry", "Durian"],
  ["Elderberry", "Fig"]
];
writeCSV(filePath, dataOut);


// Funzione per leggere un CSV
function readCSV(filePath, callback) {
  const dataIn = [];
  fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('data', row => dataIn.push(row))
    .on('end', () => callback(dataIn));
}

// Funzione per scrivere su un CSV
function writeCSV(filePath, data) {
  csvStringify.stringify(data, (err, output) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.appendFile(filePath, output, 'utf8', () => {
      console.log("Data has been written to CSV file.");
    });
  });
}

module.exports = { readCSV, writeCSV };
